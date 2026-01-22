import { Router } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";
import { LoginService } from "@proodos/application/Services/Auth/LoginService";
import { AuthError } from "@proodos/application/Errors/AuthError";

interface AuthControllerDeps {
  loginService: LoginService;
}

export const createAuthController = ({ loginService }: AuthControllerDeps) => {
  const router = Router();

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
    try {
      const { username, password } = req.body as { username?: string; password?: string };
      const result = await loginService.execute(username ?? "", password ?? "");

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return res.status(500).json({ error: true, message: "JWT_SECRET no configurado." });
      }

      const refreshSecret = process.env.JWT_REFRESH_SECRET;
      if (!refreshSecret) {
        return res.status(500).json({ error: true, message: "JWT_REFRESH_SECRET no configurado." });
      }

      const expiresIn = process.env.JWT_EXPIRES_IN ?? "60m";
      const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN ?? "7d";
      const token = jwt.sign({ sub: result.username, roles: result.roles }, secret, {
        expiresIn: expiresIn as SignOptions["expiresIn"],
      });
      const refreshToken = jwt.sign({ sub: result.username, roles: result.roles }, refreshSecret, {
        expiresIn: refreshExpiresIn as SignOptions["expiresIn"],
      });

      return res.status(200).json({
        token,
        refreshToken,
        user: {
          username: result.username,
          roles: result.roles,
        },
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return res.status(401).json({ error: true, message: error.message });
      }

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

    const secret = process.env.JWT_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!secret || !refreshSecret) {
      return res.status(500).json({ error: true, message: "JWT_SECRET/JWT_REFRESH_SECRET no configurado." });
    }

    try {
      const payload = jwt.verify(refreshToken, refreshSecret) as { sub?: string; roles?: string[] };
      if (!payload?.sub) {
        return res.status(401).json({ error: true, message: "Refresh token inválido." });
      }

      const expiresIn = process.env.JWT_EXPIRES_IN ?? "60m";
      const newToken = jwt.sign({ sub: payload.sub, roles: payload.roles ?? [] }, secret, {
        expiresIn: expiresIn as SignOptions["expiresIn"],
      });

      return res.status(200).json({ token: newToken });
    } catch (error) {
      return res.status(401).json({ error: true, message: "Refresh token inválido o expirado." });
    }
  });

  return router;
};
