import type { Algorithm, SignOptions, VerifyOptions } from "jsonwebtoken";
import { randomUUID } from "crypto";

const HMAC_ALGORITHMS = ["HS256", "HS384", "HS512"] as const;
const EXPIRY_UNITS_IN_MS = {
  s: 1_000,
  m: 60_000,
  h: 3_600_000,
  d: 86_400_000,
} as const;

export type TokenUse = "access" | "refresh";
export type SupportedJwtAlgorithm = (typeof HMAC_ALGORITHMS)[number];

interface IBaseTokenPayload {
  sub: string;
  roles: string[];
  iat?: number;
  exp?: number;
}

export interface AccessTokenPayload extends IBaseTokenPayload {
  token_use: "access";
}

export interface RefreshTokenPayload extends IBaseTokenPayload {
  token_use: "refresh";
  jti: string;
}

export type AuthTokenPayload = AccessTokenPayload | RefreshTokenPayload;

const isSupportedJwtAlgorithm = (value: string): value is SupportedJwtAlgorithm =>
  HMAC_ALGORITHMS.includes(value as SupportedJwtAlgorithm);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const normalizeRoles = (roles: string[]): string[] =>
  Array.from(
    new Set(
      roles
        .map((role) => role.trim().toLowerCase())
        .filter((role) => role.length > 0)
    )
  );

const getRequiredEnv = (name: string): string => {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} no configurado.`);
  }

  return value;
};

const getJwtAlgorithm = (
  envName: "JWT_ACCESS_ALGORITHM" | "JWT_REFRESH_ALGORITHM"
): SupportedJwtAlgorithm => {
  const raw = process.env[envName]?.trim().toUpperCase() ?? "HS256";
  if (!isSupportedJwtAlgorithm(raw)) {
    throw new Error(
      `${envName} invalido. Valores permitidos: ${HMAC_ALGORITHMS.join(", ")}.`
    );
  }

  return raw;
};

export const buildTokenPayload = (
  sub: string,
  roles: string[],
  tokenUse: TokenUse,
  jti?: string
): AuthTokenPayload => {
  const normalizedSub = sub.trim();
  const normalizedRoles = normalizeRoles(roles);

  if (!normalizedSub) {
    throw new Error("JWT sub invalido.");
  }

  if (normalizedRoles.length === 0) {
    throw new Error("JWT roles invalido.");
  }

  if (tokenUse === "refresh") {
    const normalizedJti = jti?.trim();
    if (!normalizedJti) {
      throw new Error("JWT refresh jti invalido.");
    }

    return {
      sub: normalizedSub,
      roles: normalizedRoles,
      token_use: tokenUse,
      jti: normalizedJti,
    };
  }

  return {
    sub: normalizedSub,
    roles: normalizedRoles,
    token_use: tokenUse,
  };
};

const isBaseTokenPayload = (payload: unknown): payload is IBaseTokenPayload => {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return false;
  }

  const candidate = payload as Partial<IBaseTokenPayload>;
  return (
    isNonEmptyString(candidate.sub) &&
    Array.isArray(candidate.roles) &&
    candidate.roles.length > 0 &&
    candidate.roles.every(isNonEmptyString)
  );
};

export const isAccessTokenPayload = (payload: unknown): payload is AccessTokenPayload =>
  isBaseTokenPayload(payload) &&
  (payload as Partial<AccessTokenPayload>).token_use === "access";

export const isRefreshTokenPayload = (payload: unknown): payload is RefreshTokenPayload =>
  isBaseTokenPayload(payload) &&
  (payload as Partial<RefreshTokenPayload>).token_use === "refresh" &&
  isNonEmptyString((payload as Partial<RefreshTokenPayload>).jti);

export const normalizeAccessTokenPayload = (
  payload: AccessTokenPayload
): AccessTokenPayload => ({
  sub: payload.sub.trim(),
  roles: normalizeRoles(payload.roles),
  token_use: "access",
  iat: payload.iat,
  exp: payload.exp,
});

export const normalizeRefreshTokenPayload = (
  payload: RefreshTokenPayload
): RefreshTokenPayload => ({
  sub: payload.sub.trim(),
  roles: normalizeRoles(payload.roles),
  token_use: "refresh",
  jti: payload.jti.trim(),
  iat: payload.iat,
  exp: payload.exp,
});

export const generateRefreshTokenId = (): string => randomUUID();

export const getAccessTokenSecret = (): string => getRequiredEnv("JWT_SECRET");

export const getRefreshTokenSecret = (): string => getRequiredEnv("JWT_REFRESH_SECRET");

export const getJwtIssuer = (): string => getRequiredEnv("JWT_ISSUER");

export const getJwtAudience = (): string => getRequiredEnv("JWT_AUDIENCE");

export const getAccessTokenAlgorithm = (): SupportedJwtAlgorithm =>
  getJwtAlgorithm("JWT_ACCESS_ALGORITHM");

export const getRefreshTokenAlgorithm = (): SupportedJwtAlgorithm =>
  getJwtAlgorithm("JWT_REFRESH_ALGORITHM");

export const buildAccessTokenSignOptions = (
  expiresIn: SignOptions["expiresIn"]
): SignOptions => ({
  algorithm: getAccessTokenAlgorithm() as Algorithm,
  issuer: getJwtIssuer(),
  audience: getJwtAudience(),
  expiresIn,
});

export const buildRefreshTokenSignOptions = (
  expiresIn: SignOptions["expiresIn"]
): SignOptions => ({
  algorithm: getRefreshTokenAlgorithm() as Algorithm,
  issuer: getJwtIssuer(),
  audience: getJwtAudience(),
  expiresIn,
});

export const buildAccessTokenVerifyOptions = (): VerifyOptions => ({
  algorithms: [getAccessTokenAlgorithm() as Algorithm],
  issuer: getJwtIssuer(),
  audience: getJwtAudience(),
});

export const buildRefreshTokenVerifyOptions = (): VerifyOptions => ({
  algorithms: [getRefreshTokenAlgorithm() as Algorithm],
  issuer: getJwtIssuer(),
  audience: getJwtAudience(),
});

export const buildExpirationDate = (
  expiresIn: SignOptions["expiresIn"],
  issuedAt = new Date()
): Date => {
  if (typeof expiresIn === "number" && Number.isFinite(expiresIn) && expiresIn > 0) {
    return new Date(issuedAt.getTime() + expiresIn * 1_000);
  }

  if (typeof expiresIn === "string") {
    const normalizedExpiresIn = expiresIn.trim().toLowerCase();
    if (/^\d+$/.test(normalizedExpiresIn)) {
      return new Date(issuedAt.getTime() + Number(normalizedExpiresIn) * 1_000);
    }

    const match = normalizedExpiresIn.match(/^(\d+)([smhd])$/);
    if (match) {
      const [, amount, unit] = match;
      return new Date(
        issuedAt.getTime() + Number(amount) * EXPIRY_UNITS_IN_MS[unit as keyof typeof EXPIRY_UNITS_IN_MS]
      );
    }
  }

  throw new Error(
    "JWT expiresIn invalido. Formatos soportados: numero en segundos o sufijos s, m, h, d."
  );
};

export const validateJwtConfiguration = (): void => {
  getAccessTokenSecret();
  getRefreshTokenSecret();
  getJwtIssuer();
  getJwtAudience();
  getAccessTokenAlgorithm();
  getRefreshTokenAlgorithm();
};
