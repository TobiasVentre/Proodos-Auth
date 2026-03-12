import { Router } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";
import { LoginService } from "@proodos/application/Services/Auth/LoginService";
import { RefreshTokenService } from "@proodos/application/Services/Auth/RefreshTokenService";
import { RevokeRefreshTokenService } from "@proodos/application/Services/Auth/RevokeRefreshTokenService";
import { AuthError } from "@proodos/application/Errors/AuthError";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import {
  buildExpirationDate,
  buildAccessTokenSignOptions,
  buildRefreshTokenSignOptions,
  buildRefreshTokenVerifyOptions,
  buildTokenPayload,
  generateRefreshTokenId,
  getAccessTokenSecret,
  getRefreshTokenSecret,
  isRefreshTokenPayload,
  normalizeRefreshTokenPayload,
} from "@proodos/api/Security/jwt";

interface AuthControllerDeps {
  loginService: LoginService;
  refreshTokenService: RefreshTokenService;
  revokeRefreshTokenService: RevokeRefreshTokenService;
  logger: ILogger;
}

const getErrorMeta = (error: unknown): Record<string, unknown> => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }

  return { error };
};

const isJwtValidationError = (error: unknown): boolean =>
  error instanceof Error &&
  ["JsonWebTokenError", "TokenExpiredError", "NotBeforeError"].includes(error.name);

export const createAuthController = ({
  loginService,
  refreshTokenService,
  revokeRefreshTokenService,
  logger,
}: AuthControllerDeps) => {
  const router = Router();
  const accessExpiresIn = (process.env.JWT_EXPIRES_IN ?? "60m") as SignOptions["expiresIn"];
  const refreshExpiresIn = (process.env.JWT_REFRESH_EXPIRES_IN ?? "7d") as SignOptions["expiresIn"];

  const issueAccessToken = (username: string, roles: string[]): string =>
    jwt.sign(
      buildTokenPayload(username, roles, "access"),
      getAccessTokenSecret(),
      buildAccessTokenSignOptions(accessExpiresIn)
    );

  const issueRefreshToken = (username: string, roles: string[]) => {
    const tokenId = generateRefreshTokenId();
    const issuedAt = new Date();

    return {
      tokenId,
      issuedAt,
      expiresAt: buildExpirationDate(refreshExpiresIn, issuedAt),
      token: jwt.sign(
        buildTokenPayload(username, roles, "refresh", tokenId),
        getRefreshTokenSecret(),
        buildRefreshTokenSignOptions(refreshExpiresIn)
      ),
    };
  };

  /**
   * @openapi
   * /api/auth/login:
   *   post:
   *     summary: Autenticar usuario vía LDAP y emitir JWT.
   *     tags:
   *       - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginRequest'
   *     responses:
   *       200:
   *         description: Login exitoso.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/LoginResponse'
   *       401:
   *         description: Credenciales inválidas.
   */
  router.post("/login", async (req, res) => {
    const { username, password } = req.body as { username?: string; password?: string };
    const requestMeta = {
      username: username ?? "",
      ip: req.ip,
      path: req.originalUrl,
      method: req.method,
    };

    try {
      logger.info("Intento de login recibido.", requestMeta);
      const result = await loginService.execute(username ?? "", password ?? "");
      const token = issueAccessToken(result.username, result.roles);
      const refreshToken = issueRefreshToken(result.username, result.roles);
      await refreshTokenService.registerIssuedToken({
        tokenId: refreshToken.tokenId,
        username: result.username,
        issuedAt: refreshToken.issuedAt,
        expiresAt: refreshToken.expiresAt,
      });

      return res.status(200).json({
        token,
        refreshToken: refreshToken.token,
        user: {
          username: result.username,
          roles: result.roles,
        },
      });
    } catch (error) {
      if (error instanceof AuthError) {
        logger.warn("Login rechazado por regla de autenticación.", {
          ...requestMeta,
          reason: error.message,
        });
        return res.status(401).json({ error: true, message: error.message });
      }

      logger.error("Error interno durante login.", {
        ...requestMeta,
        ...getErrorMeta(error),
      });
      return res.status(500).json({ error: true, message: "Error interno de autenticación." });
    }
  });

  /**
   * @openapi
   * /api/auth/refresh:
   *   post:
   *     summary: Renovar JWT a partir de un refresh token.
   *     tags:
   *       - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RefreshTokenRequest'
   *     responses:
   *       200:
   *         description: Token renovado.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RefreshTokenResponse'
   *       401:
   *         description: Refresh token inválido o expirado.
   */
  router.post("/refresh", async (req, res) => {
    const { refreshToken } = req.body as { refreshToken?: string };
    if (!refreshToken) {
      return res.status(400).json({ error: true, message: "refreshToken requerido." });
    }

    try {
      const verifiedPayload = jwt.verify(
        refreshToken,
        getRefreshTokenSecret(),
        buildRefreshTokenVerifyOptions()
      );
      if (!isRefreshTokenPayload(verifiedPayload)) {
        return res.status(401).json({ error: true, message: "Refresh token inválido." });
      }

      const payload = normalizeRefreshTokenPayload(verifiedPayload);
      const refreshedUser = await refreshTokenService.resolveRefreshContext({
        username: payload.sub,
        tokenId: payload.jti,
      });
      const newToken = issueAccessToken(refreshedUser.username, refreshedUser.roles);
      const newRefreshToken = issueRefreshToken(refreshedUser.username, refreshedUser.roles);

      await refreshTokenService.rotate({
        username: refreshedUser.username,
        currentTokenId: payload.jti,
        nextTokenId: newRefreshToken.tokenId,
        nextIssuedAt: newRefreshToken.issuedAt,
        nextExpiresAt: newRefreshToken.expiresAt,
      });

      return res.status(200).json({ token: newToken, refreshToken: newRefreshToken.token });
    } catch (error) {
      if (error instanceof AuthError) {
        logger.warn("Refresh token rechazado.", {
          ip: req.ip,
          path: req.originalUrl,
          method: req.method,
          reason: error.message,
        });
        return res.status(401).json({ error: true, message: error.message });
      }

      if (isJwtValidationError(error)) {
        logger.warn("Refresh token inválido o expirado.", {
          ip: req.ip,
          path: req.originalUrl,
          method: req.method,
          ...getErrorMeta(error),
        });
        return res.status(401).json({ error: true, message: "Refresh token inválido o expirado." });
      }

      logger.error("Error interno durante refresh token.", {
        ip: req.ip,
        path: req.originalUrl,
        method: req.method,
        ...getErrorMeta(error),
      });
      return res
        .status(500)
        .json({ error: true, message: "Error interno durante refresh token." });
    }
  });

  /**
   * @openapi
   * /api/auth/logout:
   *   post:
   *     summary: Revocar la sesión asociada a un refresh token.
   *     tags:
   *       - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LogoutRequest'
   *     responses:
   *       204:
   *         description: Sesión revocada.
   *       401:
   *         description: Refresh token inválido o expirado.
   */
  router.post("/logout", async (req, res) => {
    const { refreshToken } = req.body as { refreshToken?: string };
    if (!refreshToken) {
      return res.status(400).json({ error: true, message: "refreshToken requerido." });
    }

    try {
      const verifiedPayload = jwt.verify(
        refreshToken,
        getRefreshTokenSecret(),
        buildRefreshTokenVerifyOptions()
      );
      if (!isRefreshTokenPayload(verifiedPayload)) {
        return res.status(401).json({ error: true, message: "Refresh token inválido." });
      }

      const payload = normalizeRefreshTokenPayload(verifiedPayload);
      await revokeRefreshTokenService.execute(payload.jti);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof AuthError) {
        logger.warn("Logout rechazado por refresh token inválido.", {
          ip: req.ip,
          path: req.originalUrl,
          method: req.method,
          reason: error.message,
        });
        return res.status(401).json({ error: true, message: error.message });
      }

      if (isJwtValidationError(error)) {
        logger.warn("Refresh token inválido o expirado.", {
          ip: req.ip,
          path: req.originalUrl,
          method: req.method,
          ...getErrorMeta(error),
        });
        return res.status(401).json({ error: true, message: "Refresh token inválido o expirado." });
      }

      logger.error("Error interno durante logout.", {
        ip: req.ip,
        path: req.originalUrl,
        method: req.method,
        ...getErrorMeta(error),
      });
      return res.status(500).json({ error: true, message: "Error interno durante logout." });
    }
  });

  return router;
};
