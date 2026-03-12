import { RefreshTokenSessionRepository } from "@proodos/application/Interfaces/IRefreshTokenSessionRepository";
import { AuthError } from "@proodos/application/Errors/AuthError";

const normalizeTokenId = (tokenId: string): string => tokenId.trim();

export class RevokeRefreshTokenService {
  constructor(private readonly refreshTokenSessionRepository: RefreshTokenSessionRepository) {}

  async execute(tokenId: string): Promise<void> {
    const normalizedTokenId = normalizeTokenId(tokenId);
    if (!normalizedTokenId) {
      throw new AuthError("Refresh token inválido o expirado.");
    }

    const session = await this.refreshTokenSessionRepository.findByTokenId(normalizedTokenId);
    if (!session) {
      return;
    }

    await this.refreshTokenSessionRepository.revoke(normalizedTokenId, "logout");

    const replacedByTokenId = session.replacedByTokenId?.trim();
    if (replacedByTokenId) {
      await this.refreshTokenSessionRepository.revokeDescendantChain(replacedByTokenId, "logout");
    }
  }
}
