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

      const expiresIn = process.env.JWT_EXPIRES_IN ?? "1h";
      const token = jwt.sign({ sub: result.username, roles: result.roles }, secret, {
        expiresIn: expiresIn as SignOptions["expiresIn"],
      });

      return res.status(200).json({
        token,
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

  return router;
};
