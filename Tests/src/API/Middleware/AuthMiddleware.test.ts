import type { NextFunction, Request, Response } from "express";

const mockVerify = jest.fn();

jest.mock("jsonwebtoken", () => ({
  __esModule: true,
  default: {
    verify: (...args: unknown[]) => mockVerify(...args),
  },
}));

import { authenticateJWT } from "@proodos/api/Middleware/auth";

type IRequestWithUser = Omit<Partial<Request>, "user"> & {
  header: Request["header"];
  user?: Record<string, unknown>;
};

type IResponseMock = Partial<Response> & {
  status: any;
  json: any;
};

const createRequest = (
  authorization?: string,
  user?: Record<string, unknown>
): IRequestWithUser => ({
  header: ((name: string) => (name.toLowerCase() === "authorization" ? authorization : undefined)) as Request["header"],
  user,
});

const createResponse = (): IResponseMock => {
  const response: IResponseMock = {
    status: jest.fn(),
    json: jest.fn(),
  };

  response.status.mockReturnValue(response);
  return response;
};

describe("Auth middleware", () => {
  const originalJwtSecret = process.env.JWT_SECRET;
  const originalJwtIssuer = process.env.JWT_ISSUER;
  const originalJwtAudience = process.env.JWT_AUDIENCE;
  const originalJwtAccessAlgorithm = process.env.JWT_ACCESS_ALGORITHM;

  beforeEach(() => {
    process.env.JWT_SECRET = "shared-secret";
    process.env.JWT_ISSUER = "proodos-auth";
    process.env.JWT_AUDIENCE = "proodos-be";
    process.env.JWT_ACCESS_ALGORITHM = "HS256";
    mockVerify.mockReset();
  });

  afterAll(() => {
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }

    if (originalJwtIssuer === undefined) {
      delete process.env.JWT_ISSUER;
    } else {
      process.env.JWT_ISSUER = originalJwtIssuer;
    }

    if (originalJwtAudience === undefined) {
      delete process.env.JWT_AUDIENCE;
    } else {
      process.env.JWT_AUDIENCE = originalJwtAudience;
    }

    if (originalJwtAccessAlgorithm === undefined) {
      delete process.env.JWT_ACCESS_ALGORITHM;
    } else {
      process.env.JWT_ACCESS_ALGORITHM = originalJwtAccessAlgorithm;
    }
  });

  it("should attach validated access token payload to req.user", () => {
    const req = createRequest("Bearer signed-token");
    const res = createResponse();
    const next = jest.fn();
    mockVerify.mockReturnValue({ sub: "jdoe", roles: ["admin"], token_use: "access" });

    authenticateJWT(req as Request, res as Response, next as NextFunction);

    expect(mockVerify).toHaveBeenCalledWith("signed-token", "shared-secret", {
      algorithms: ["HS256"],
      issuer: "proodos-auth",
      audience: "proodos-be",
    });
    expect(req.user).toEqual({ sub: "jdoe", roles: ["admin"], token_use: "access" });
    expect(next).toHaveBeenCalledWith();
  });

  it("should reject refresh tokens on protected routes", () => {
    const res = createResponse();
    mockVerify.mockReturnValue({ sub: "jdoe", roles: ["admin"], token_use: "refresh" });

    authenticateJWT(createRequest("Bearer refresh-token") as Request, res as Response, jest.fn() as NextFunction);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: "Token inválido o expirado." });
  });

  it("should reject tokens with invalid roles shape", () => {
    const res = createResponse();
    mockVerify.mockReturnValue({ sub: "jdoe", roles: "admin", token_use: "access" });

    authenticateJWT(createRequest("Bearer invalid-roles") as Request, res as Response, jest.fn() as NextFunction);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: "Token inválido o expirado." });
  });

  it("should reject malformed bearer headers", () => {
    const res = createResponse();

    authenticateJWT(createRequest("Bearer token extra") as Request, res as Response, jest.fn() as NextFunction);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: true, message: "Authorization inválido." });
  });
});
