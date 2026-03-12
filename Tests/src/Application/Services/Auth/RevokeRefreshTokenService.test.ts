import { RefreshTokenSessionRepository } from "@proodos/application/Interfaces/IRefreshTokenSessionRepository";
import { RevokeRefreshTokenService } from "@proodos/application/Services/Auth/RevokeRefreshTokenService";

describe("RevokeRefreshTokenService", () => {
  it("should revoke the provided refresh token", async () => {
    const refreshTokenSessionRepository: RefreshTokenSessionRepository = {
      create: jest.fn(),
      findByTokenId: jest.fn().mockResolvedValue({
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
      }),
      rotate: jest.fn(),
      revoke: jest.fn().mockResolvedValue(true),
      revokeDescendantChain: jest.fn(),
    };
    const service = new RevokeRefreshTokenService(refreshTokenSessionRepository);

    await service.execute(" refresh-jti ");

    expect(refreshTokenSessionRepository.findByTokenId).toHaveBeenCalledWith("refresh-jti");
    expect(refreshTokenSessionRepository.revoke).toHaveBeenCalledWith("refresh-jti", "logout");
    expect(refreshTokenSessionRepository.revokeDescendantChain).not.toHaveBeenCalled();
  });

  it("should revoke the rotated token family when logout receives an ancestor token", async () => {
    const refreshTokenSessionRepository: RefreshTokenSessionRepository = {
      create: jest.fn(),
      findByTokenId: jest.fn().mockResolvedValue({
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
      }),
      rotate: jest.fn(),
      revoke: jest.fn().mockResolvedValue(false),
      revokeDescendantChain: jest.fn().mockResolvedValue(undefined),
    };
    const service = new RevokeRefreshTokenService(refreshTokenSessionRepository);

    await service.execute("refresh-jti");

    expect(refreshTokenSessionRepository.revoke).toHaveBeenCalledWith("refresh-jti", "logout");
    expect(refreshTokenSessionRepository.revokeDescendantChain).toHaveBeenCalledWith(
      "next-jti",
      "logout"
    );
  });
});
