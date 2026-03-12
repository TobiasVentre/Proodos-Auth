import { AuthError } from "@proodos/application/Errors/AuthError";
import {
  CreateRefreshTokenSessionInput,
  RefreshTokenSessionRepository,
} from "@proodos/application/Interfaces/IRefreshTokenSessionRepository";
import { UserRoleRepository } from "@proodos/application/Interfaces/IUserRoleRepository";
import { normalizeUsername, resolveAllowedRoles } from "./AuthRoleResolver";

export interface RefreshTokenResult {
  username: string;
  roles: string[];
}

interface ResolveRefreshTokenInput {
  username: string;
  tokenId: string;
}

interface RotateRefreshTokenInput {
  username: string;
  currentTokenId: string;
  nextTokenId: string;
  nextIssuedAt: Date;
  nextExpiresAt: Date;
}

const normalizeTokenId = (tokenId: string): string => tokenId.trim();

const normalizeDate = (value: Date): Date => {
  const normalizedDate = new Date(value);

  if (Number.isNaN(normalizedDate.getTime())) {
    throw new AuthError("Refresh token inválido o expirado.");
  }

  return normalizedDate;
};

export class RefreshTokenService {
  constructor(
    private readonly userRoleRepository: UserRoleRepository,
    private readonly refreshTokenSessionRepository: RefreshTokenSessionRepository
  ) {}

  async registerIssuedToken(input: CreateRefreshTokenSessionInput): Promise<void> {
    const normalizedUsername = normalizeUsername(input.username);
    const normalizedTokenId = normalizeTokenId(input.tokenId);
    if (!normalizedUsername || !normalizedTokenId) {
      throw new AuthError("Refresh token inválido.");
    }

    await this.refreshTokenSessionRepository.create({
      tokenId: normalizedTokenId,
      username: normalizedUsername,
      issuedAt: normalizeDate(input.issuedAt),
      expiresAt: normalizeDate(input.expiresAt),
    });
  }

  async resolveRefreshContext({
    username,
    tokenId,
  }: ResolveRefreshTokenInput): Promise<RefreshTokenResult> {
    const normalizedUsername = normalizeUsername(username);
    const normalizedTokenId = normalizeTokenId(tokenId);
    if (!normalizedUsername || !normalizedTokenId) {
      throw new AuthError("Refresh token inválido.");
    }

    const session = await this.refreshTokenSessionRepository.findByTokenId(normalizedTokenId);
    if (!session || normalizeUsername(session.username) !== normalizedUsername) {
      throw new AuthError("Refresh token inválido o expirado.");
    }

    if (session.revokedAt) {
      const replacedByTokenId = session.replacedByTokenId?.trim();
      if (replacedByTokenId) {
        await this.refreshTokenSessionRepository.revokeDescendantChain(
          replacedByTokenId,
          "refresh_token_reuse_detected"
        );
      }
      throw new AuthError("Refresh token inválido o expirado.");
    }

    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      await this.refreshTokenSessionRepository.revoke(normalizedTokenId, "expired");
      throw new AuthError("Refresh token inválido o expirado.");
    }

    const roles = await this.userRoleRepository.getRolesByUsername(normalizedUsername);
    const allowedRoles = resolveAllowedRoles(roles);

    if (allowedRoles.length === 0) {
      throw new AuthError("Usuario sin roles asignados.");
    }

    return {
      username: normalizedUsername,
      roles: allowedRoles,
    };
  }

  async rotate({
    username,
    currentTokenId,
    nextTokenId,
    nextIssuedAt,
    nextExpiresAt,
  }: RotateRefreshTokenInput): Promise<void> {
    const normalizedUsername = normalizeUsername(username);
    const normalizedCurrentTokenId = normalizeTokenId(currentTokenId);
    const normalizedNextTokenId = normalizeTokenId(nextTokenId);
    if (!normalizedUsername || !normalizedCurrentTokenId || !normalizedNextTokenId) {
      throw new AuthError("Refresh token inválido.");
    }

    const rotated = await this.refreshTokenSessionRepository.rotate({
      currentTokenId: normalizedCurrentTokenId,
      tokenId: normalizedNextTokenId,
      username: normalizedUsername,
      issuedAt: normalizeDate(nextIssuedAt),
      expiresAt: normalizeDate(nextExpiresAt),
    });

    if (rotated) {
      return;
    }

    const currentSession = await this.refreshTokenSessionRepository.findByTokenId(
      normalizedCurrentTokenId
    );
    const replacedByTokenId = currentSession?.replacedByTokenId?.trim();

    if (replacedByTokenId) {
      await this.refreshTokenSessionRepository.revokeDescendantChain(
        replacedByTokenId,
        "refresh_token_reuse_detected"
      );
    }

    throw new AuthError("Refresh token inválido o expirado.");
  }
}
