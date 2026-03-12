import type { Request, Response } from "express";
import { createAuthController } from "@proodos/api/Controllers/AuthController";

const mockSign = jest.fn();
const mockVerify = jest.fn();

jest.mock("jsonwebtoken", () => ({
  __esModule: true,
  default: {
    sign: (...args: unknown[]) => mockSign(...args),
    verify: (...args: unknown[]) => mockVerify(...args),
  },
}));

type IResponseMock = Partial<Response> & {
  status: any;
  json: any;
  send: any;
};

const createResponse = (): IResponseMock => {
  const response: IResponseMock = {
    status: jest.fn(),
    json: jest.fn(),
    send: jest.fn(),
  };

  response.status.mockReturnValue(response);
  response.send.mockReturnValue(response);
  return response;
};

const getRouteHandler = (
  router: ReturnType<typeof createAuthController>,
  path: string,
  method: "post"
) => {
  const layer = (router as unknown as { stack: Array<Record<string, unknown>> }).stack.find(
    (entry) =>
      (entry as { route?: { path?: string; methods?: Record<string, boolean> } }).route?.path === path &&
      (entry as { route?: { methods?: Record<string, boolean> } }).route?.methods?.[method]
  ) as {
    route: {
      stack: Array<{
        handle: (req: Request, res: Response) => Promise<void> | void;
      }>;
    };
  };

  return layer.route.stack[0].handle;
};

describe("AuthController", () => {
  const originalJwtSecret = process.env.JWT_SECRET;
  const originalJwtRefreshSecret = process.env.JWT_REFRESH_SECRET;
  const originalJwtIssuer = process.env.JWT_ISSUER;
  const originalJwtAudience = process.env.JWT_AUDIENCE;
  const originalJwtAccessAlgorithm = process.env.JWT_ACCESS_ALGORITHM;
  const originalJwtRefreshAlgorithm = process.env.JWT_REFRESH_ALGORITHM;
  const originalJwtExpiresIn = process.env.JWT_EXPIRES_IN;
  const originalJwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN;

  beforeEach(() => {
    process.env.JWT_SECRET = "shared-secret";
    process.env.JWT_REFRESH_SECRET = "refresh-secret";
    process.env.JWT_ISSUER = "proodos-auth";
    process.env.JWT_AUDIENCE = "proodos-be";
    process.env.JWT_ACCESS_ALGORITHM = "HS256";
    process.env.JWT_REFRESH_ALGORITHM = "HS256";
    process.env.JWT_EXPIRES_IN = "60m";
    process.env.JWT_REFRESH_EXPIRES_IN = "7d";
    mockSign.mockReset();
    mockVerify.mockReset();
  });

  afterAll(() => {
    const restoreEnv = (key: string, value: string | undefined) => {
      if (value === undefined) {
        delete process.env[key];
        return;
      }

      process.env[key] = value;
    };

    restoreEnv("JWT_SECRET", originalJwtSecret);
    restoreEnv("JWT_REFRESH_SECRET", originalJwtRefreshSecret);
    restoreEnv("JWT_ISSUER", originalJwtIssuer);
    restoreEnv("JWT_AUDIENCE", originalJwtAudience);
    restoreEnv("JWT_ACCESS_ALGORITHM", originalJwtAccessAlgorithm);
    restoreEnv("JWT_REFRESH_ALGORITHM", originalJwtRefreshAlgorithm);
    restoreEnv("JWT_EXPIRES_IN", originalJwtExpiresIn);
    restoreEnv("JWT_REFRESH_EXPIRES_IN", originalJwtRefreshExpiresIn);
  });

  it("should issue access and refresh tokens with strict claims", async () => {
    const loginService = {
      execute: jest.fn().mockResolvedValue({
        username: "jdoe",
        roles: ["admin", "desarrollador"],
      }),
    };
    const refreshTokenService = {
      registerIssuedToken: jest.fn().mockResolvedValue(undefined),
      resolveRefreshContext: jest.fn(),
      rotate: jest.fn(),
    };
    const revokeRefreshTokenService = {
      execute: jest.fn(),
    };
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const router = createAuthController({
      loginService: loginService as never,
      refreshTokenService: refreshTokenService as never,
      revokeRefreshTokenService: revokeRefreshTokenService as never,
      logger: logger as never,
    });
    const loginHandler = getRouteHandler(router, "/login", "post");
    const req = {
      body: { username: "jdoe", password: "ok" },
      ip: "127.0.0.1",
      originalUrl: "/api/auth/login",
      method: "POST",
    } as Request;
    const res = createResponse();

    mockSign.mockReturnValueOnce("access-token").mockReturnValueOnce("refresh-token");

    await loginHandler(req, res as Response);

    expect(mockSign).toHaveBeenNthCalledWith(
      1,
      { sub: "jdoe", roles: ["admin", "desarrollador"], token_use: "access" },
      "shared-secret",
      {
        algorithm: "HS256",
        issuer: "proodos-auth",
        audience: "proodos-be",
        expiresIn: "60m",
      }
    );
    expect(mockSign).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        sub: "jdoe",
        roles: ["admin", "desarrollador"],
        token_use: "refresh",
        jti: expect.any(String),
      }),
      "refresh-secret",
      {
        algorithm: "HS256",
        issuer: "proodos-auth",
        audience: "proodos-be",
        expiresIn: "7d",
      }
    );
    expect(refreshTokenService.registerIssuedToken).toHaveBeenCalledWith({
      tokenId: expect.any(String),
      username: "jdoe",
      issuedAt: expect.any(Date),
      expiresAt: expect.any(Date),
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "access-token",
      refreshToken: "refresh-token",
      user: {
        username: "jdoe",
        roles: ["admin", "desarrollador"],
      },
    });
  });

  it("should refresh only refresh tokens with valid claims and rotate them", async () => {
    const loginService = { execute: jest.fn() };
    const refreshTokenService = {
      registerIssuedToken: jest.fn(),
      resolveRefreshContext: jest.fn().mockResolvedValue({
        username: "jdoe",
        roles: ["admin", "desarrollador"],
      }),
      rotate: jest.fn().mockResolvedValue(undefined),
    };
    const revokeRefreshTokenService = {
      execute: jest.fn(),
    };
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const router = createAuthController({
      loginService: loginService as never,
      refreshTokenService: refreshTokenService as never,
      revokeRefreshTokenService: revokeRefreshTokenService as never,
      logger: logger as never,
    });
    const refreshHandler = getRouteHandler(router, "/refresh", "post");
    const req = {
      body: { refreshToken: "refresh-token" },
      ip: "127.0.0.1",
      originalUrl: "/api/auth/refresh",
      method: "POST",
    } as Request;
    const res = createResponse();

    mockVerify.mockReturnValue({
      sub: "jdoe",
      roles: ["admin"],
      token_use: "refresh",
      jti: "refresh-jti",
    });
    mockSign.mockReturnValueOnce("new-access-token").mockReturnValueOnce("new-refresh-token");

    await refreshHandler(req, res as Response);

    expect(mockVerify).toHaveBeenCalledWith("refresh-token", "refresh-secret", {
      algorithms: ["HS256"],
      issuer: "proodos-auth",
      audience: "proodos-be",
    });
    expect(refreshTokenService.resolveRefreshContext).toHaveBeenCalledWith({
      username: "jdoe",
      tokenId: "refresh-jti",
    });
    expect(mockSign).toHaveBeenCalledWith(
      { sub: "jdoe", roles: ["admin", "desarrollador"], token_use: "access" },
      "shared-secret",
      {
        algorithm: "HS256",
        issuer: "proodos-auth",
        audience: "proodos-be",
        expiresIn: "60m",
      }
    );
    expect(refreshTokenService.rotate).toHaveBeenCalledWith({
      username: "jdoe",
      currentTokenId: "refresh-jti",
      nextTokenId: expect.any(String),
      nextIssuedAt: expect.any(Date),
      nextExpiresAt: expect.any(Date),
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "new-access-token",
      refreshToken: "new-refresh-token",
    });
  });

  it("should reject access tokens in refresh endpoint", async () => {
    const loginService = { execute: jest.fn() };
    const refreshTokenService = {
      registerIssuedToken: jest.fn(),
      resolveRefreshContext: jest.fn(),
      rotate: jest.fn(),
    };
    const revokeRefreshTokenService = { execute: jest.fn() };
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const router = createAuthController({
      loginService: loginService as never,
      refreshTokenService: refreshTokenService as never,
      revokeRefreshTokenService: revokeRefreshTokenService as never,
      logger: logger as never,
    });
    const refreshHandler = getRouteHandler(router, "/refresh", "post");
    const req = {
      body: { refreshToken: "access-token" },
      ip: "127.0.0.1",
      originalUrl: "/api/auth/refresh",
      method: "POST",
    } as Request;
    const res = createResponse();

    mockVerify.mockReturnValue({ sub: "jdoe", roles: ["admin"], token_use: "access" });

    await refreshHandler(req, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: "Refresh token inválido." });
    expect(mockSign).not.toHaveBeenCalled();
  });

  it("should reject refresh tokens without jti", async () => {
    const loginService = { execute: jest.fn() };
    const refreshTokenService = {
      registerIssuedToken: jest.fn(),
      resolveRefreshContext: jest.fn(),
      rotate: jest.fn(),
    };
    const revokeRefreshTokenService = { execute: jest.fn() };
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const router = createAuthController({
      loginService: loginService as never,
      refreshTokenService: refreshTokenService as never,
      revokeRefreshTokenService: revokeRefreshTokenService as never,
      logger: logger as never,
    });
    const refreshHandler = getRouteHandler(router, "/refresh", "post");
    const req = {
      body: { refreshToken: "refresh-token" },
      ip: "127.0.0.1",
      originalUrl: "/api/auth/refresh",
      method: "POST",
    } as Request;
    const res = createResponse();

    mockVerify.mockReturnValue({ sub: "jdoe", roles: ["admin"], token_use: "refresh" });

    await refreshHandler(req, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: "Refresh token inválido." });
    expect(refreshTokenService.resolveRefreshContext).not.toHaveBeenCalled();
  });

  it("should revoke refresh token sessions on logout", async () => {
    const loginService = { execute: jest.fn() };
    const refreshTokenService = {
      registerIssuedToken: jest.fn(),
      resolveRefreshContext: jest.fn(),
      rotate: jest.fn(),
    };
    const revokeRefreshTokenService = {
      execute: jest.fn().mockResolvedValue(undefined),
    };
    const logger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
    const router = createAuthController({
      loginService: loginService as never,
      refreshTokenService: refreshTokenService as never,
      revokeRefreshTokenService: revokeRefreshTokenService as never,
      logger: logger as never,
    });
    const logoutHandler = getRouteHandler(router, "/logout", "post");
    const req = {
      body: { refreshToken: "refresh-token" },
      ip: "127.0.0.1",
      originalUrl: "/api/auth/logout",
      method: "POST",
    } as Request;
    const res = createResponse();

    mockVerify.mockReturnValue({
      sub: "jdoe",
      roles: ["admin"],
      token_use: "refresh",
      jti: "refresh-jti",
    });

    await logoutHandler(req, res as Response);

    expect(revokeRefreshTokenService.execute).toHaveBeenCalledWith("refresh-jti");
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});
