import { RefreshTokenService } from "@proodos/application/Services/Auth/RefreshTokenService";
import { AuthError } from "@proodos/application/Errors/AuthError";
import { RefreshTokenSessionRepository } from "@proodos/application/Interfaces/IRefreshTokenSessionRepository";
import { UserRoleRepository } from "@proodos/application/Interfaces/IUserRoleRepository";

describe("RefreshTokenService", () => {
  const createRefreshTokenSessionRepository = (): RefreshTokenSessionRepository => ({
    create: jest.fn(),
    findByTokenId: jest.fn(),
    rotate: jest.fn(),
    revoke: jest.fn(),
    revokeDescendantChain: jest.fn(),
  });

  it("should register an issued refresh token session", async () => {
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn(),
      hasRole: jest.fn(),
    };
    const refreshTokenSessionRepository = createRefreshTokenSessionRepository();
    const service = new RefreshTokenService(userRoleRepository, refreshTokenSessionRepository);

    await service.registerIssuedToken({
      tokenId: " refresh-jti ",
      username: "ACME\\jdoe",
      issuedAt: new Date("2026-03-10T10:00:00.000Z"),
      expiresAt: new Date("2026-03-17T10:00:00.000Z"),
    });

    expect(refreshTokenSessionRepository.create).toHaveBeenCalledWith({
      tokenId: "refresh-jti",
      username: "jdoe",
      issuedAt: new Date("2026-03-10T10:00:00.000Z"),
      expiresAt: new Date("2026-03-17T10:00:00.000Z"),
    });
  });

  it("should resolve current allowed roles from repository", async () => {
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn().mockResolvedValue([
        { id: 1, name: " Admin ", description: null, createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: "viewer", description: null, createdAt: new Date(), updatedAt: new Date() },
        { id: 3, name: "Desarrollador", description: null, createdAt: new Date(), updatedAt: new Date() },
      ]),
      hasRole: jest.fn(),
    };
    const refreshTokenSessionRepository = createRefreshTokenSessionRepository();
    refreshTokenSessionRepository.findByTokenId = jest.fn().mockResolvedValue({
      id: 1,
      tokenId: "refresh-jti",
      username: "jdoe",
      issuedAt: new Date(),
      expiresAt: new Date(Date.now() + 60_000),
      revokedAt: null,
      revokeReason: null,
      replacedByTokenId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const service = new RefreshTokenService(userRoleRepository, refreshTokenSessionRepository);

    const result = await service.resolveRefreshContext({
      username: "ACME\\jdoe",
      tokenId: "refresh-jti",
    });

    expect(userRoleRepository.getRolesByUsername).toHaveBeenCalledWith("jdoe");
    expect(refreshTokenSessionRepository.findByTokenId).toHaveBeenCalledWith("refresh-jti");
    expect(result).toEqual({ username: "jdoe", roles: ["admin", "desarrollador"] });
  });

  it("should reject users without current allowed roles", async () => {
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn().mockResolvedValue([
        { id: 1, name: "viewer", description: null, createdAt: new Date(), updatedAt: new Date() },
      ]),
      hasRole: jest.fn(),
    };
    const refreshTokenSessionRepository = createRefreshTokenSessionRepository();
    refreshTokenSessionRepository.findByTokenId = jest.fn().mockResolvedValue({
      id: 1,
      tokenId: "refresh-jti",
      username: "jdoe",
      issuedAt: new Date(),
      expiresAt: new Date(Date.now() + 60_000),
      revokedAt: null,
      revokeReason: null,
      replacedByTokenId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const service = new RefreshTokenService(userRoleRepository, refreshTokenSessionRepository);

    const action = () =>
      service.resolveRefreshContext({ username: "jdoe", tokenId: "refresh-jti" });

    await expect(action()).rejects.toBeInstanceOf(AuthError);
  });

  it("should reject expired persisted sessions", async () => {
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn(),
      hasRole: jest.fn(),
    };
    const refreshTokenSessionRepository = createRefreshTokenSessionRepository();
    refreshTokenSessionRepository.findByTokenId = jest.fn().mockResolvedValue({
      id: 1,
      tokenId: "refresh-jti",
      username: "jdoe",
      issuedAt: new Date(Date.now() - 120_000),
      expiresAt: new Date(Date.now() - 60_000),
      revokedAt: null,
      revokeReason: null,
      replacedByTokenId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    refreshTokenSessionRepository.revoke = jest.fn().mockResolvedValue(true);
    const service = new RefreshTokenService(userRoleRepository, refreshTokenSessionRepository);

    const action = () =>
      service.resolveRefreshContext({ username: "jdoe", tokenId: "refresh-jti" });

    await expect(action()).rejects.toBeInstanceOf(AuthError);
    expect(refreshTokenSessionRepository.revoke).toHaveBeenCalledWith("refresh-jti", "expired");
  });

  it("should revoke descendants when a rotated refresh token is reused", async () => {
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn(),
      hasRole: jest.fn(),
    };
    const refreshTokenSessionRepository = createRefreshTokenSessionRepository();
    refreshTokenSessionRepository.findByTokenId = jest.fn().mockResolvedValue({
      id: 1,
      tokenId: "refresh-jti",
      username: "jdoe",
      issuedAt: new Date(),
      expiresAt: new Date(Date.now() + 60_000),
      revokedAt: new Date(),
      revokeReason: "rotated",
      replacedByTokenId: "next-jti",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    refreshTokenSessionRepository.revokeDescendantChain = jest.fn().mockResolvedValue(undefined);
    const service = new RefreshTokenService(userRoleRepository, refreshTokenSessionRepository);

    const action = () =>
      service.resolveRefreshContext({ username: "jdoe", tokenId: "refresh-jti" });

    await expect(action()).rejects.toBeInstanceOf(AuthError);
    expect(refreshTokenSessionRepository.revokeDescendantChain).toHaveBeenCalledWith(
      "next-jti",
      "refresh_token_reuse_detected"
    );
  });

  it("should rotate refresh token sessions atomically", async () => {
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn(),
      hasRole: jest.fn(),
    };
    const refreshTokenSessionRepository = createRefreshTokenSessionRepository();
    refreshTokenSessionRepository.rotate = jest.fn().mockResolvedValue(true);
    const service = new RefreshTokenService(userRoleRepository, refreshTokenSessionRepository);

    await service.rotate({
      username: "ACME\\jdoe",
      currentTokenId: "current-jti",
      nextTokenId: "next-jti",
      nextIssuedAt: new Date("2026-03-10T10:00:00.000Z"),
      nextExpiresAt: new Date("2026-03-17T10:00:00.000Z"),
    });

    expect(refreshTokenSessionRepository.rotate).toHaveBeenCalledWith({
      currentTokenId: "current-jti",
      tokenId: "next-jti",
      username: "jdoe",
      issuedAt: new Date("2026-03-10T10:00:00.000Z"),
      expiresAt: new Date("2026-03-17T10:00:00.000Z"),
    });
  });

  it("should reject refresh rotation when current token was already replaced", async () => {
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn(),
      hasRole: jest.fn(),
    };
    const refreshTokenSessionRepository = createRefreshTokenSessionRepository();
    refreshTokenSessionRepository.rotate = jest.fn().mockResolvedValue(false);
    refreshTokenSessionRepository.findByTokenId = jest.fn().mockResolvedValue({
      id: 1,
      tokenId: "current-jti",
      username: "jdoe",
      issuedAt: new Date(),
      expiresAt: new Date(Date.now() + 60_000),
      revokedAt: new Date(),
      revokeReason: "rotated",
      replacedByTokenId: "next-jti",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    refreshTokenSessionRepository.revokeDescendantChain = jest.fn().mockResolvedValue(undefined);
    const service = new RefreshTokenService(userRoleRepository, refreshTokenSessionRepository);

    const action = () =>
      service.rotate({
        username: "jdoe",
        currentTokenId: "current-jti",
        nextTokenId: "other-jti",
        nextIssuedAt: new Date("2026-03-10T10:00:00.000Z"),
        nextExpiresAt: new Date("2026-03-17T10:00:00.000Z"),
      });

    await expect(action()).rejects.toBeInstanceOf(AuthError);
    expect(refreshTokenSessionRepository.revokeDescendantChain).toHaveBeenCalledWith(
      "next-jti",
      "refresh_token_reuse_detected"
    );
  });
});
