import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import {
  buildAccessTokenVerifyOptions,
  getAccessTokenSecret,
  isAccessTokenPayload,
  normalizeAccessTokenPayload,
} from "@proodos/api/Security/jwt";

export interface AuthPayload {
  sub: string;
  roles: string[];
  token_use: "access";
  iat?: number;
  exp?: number;
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

  const [scheme, token, ...rest] = header.trim().split(/\s+/);
  if (scheme !== "Bearer" || !token || rest.length > 0) {
    return res.status(401).json({ error: true, message: "Authorization inválido." });
  }

  try {
    const verifiedPayload = jwt.verify(
      token,
      getAccessTokenSecret(),
      buildAccessTokenVerifyOptions()
    );
    if (!isAccessTokenPayload(verifiedPayload)) {
      return res.status(401).json({ error: true, message: "Token inválido o expirado." });
    }

    req.user = normalizeAccessTokenPayload(verifiedPayload);
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
    .map((role) => role.trim().toLowerCase())
    .filter((role) => role.length > 0);
};

export const requireAnyRole =
  (allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    const roles = (req.user?.roles ?? []).map((role) => role.toLowerCase());
    if (allowedRoles.length === 0 || allowedRoles.some((role) => roles.includes(role.toLowerCase()))) {
      return next();
    }

    return res.status(403).json({ error: true, message: "No autorizado." });
  };
