import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthPayload {
  sub?: string;
  roles?: string[];
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const header = req.header("Authorization");
  if (!header) {
    return res.status(401).json({ error: true, message: "Authorization requerido." });
  }

  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: true, message: "Authorization inválido." });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: true, message: "JWT_SECRET no configurado." });
  }

  try {
    const payload = jwt.verify(token, secret) as AuthPayload;
    req.user = payload;
    return next();
  } catch {
    return res.status(401).json({ error: true, message: "Token inválido o expirado." });
  }
};

export const getAdminRoles = (): string[] => {
  const raw = process.env.ADMIN_ROLES || process.env.ADMIN_ROLE;
  if (!raw) return ["admin"];
  return raw
    .split(",")
    .map((role) => role.trim())
    .filter((role) => role.length > 0);
};

export const requireAnyRole =
  (allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const roles = req.user?.roles ?? [];
    if (allowedRoles.length === 0 || allowedRoles.some((role) => roles.includes(role))) {
      return next();
    }

    return res.status(403).json({ error: true, message: "No autorizado." });
  };
