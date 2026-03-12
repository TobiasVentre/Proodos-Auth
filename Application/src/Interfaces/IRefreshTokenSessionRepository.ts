import { RefreshTokenSession } from "@proodos/domain/Entities/RefreshTokenSession";

export interface CreateRefreshTokenSessionInput {
  tokenId: string;
  username: string;
  issuedAt: Date;
  expiresAt: Date;
}

export interface RotateRefreshTokenSessionInput extends CreateRefreshTokenSessionInput {
  currentTokenId: string;
  rotatedAt?: Date;
}

export interface RefreshTokenSessionRepository {
  create(input: CreateRefreshTokenSessionInput): Promise<RefreshTokenSession>;
  findByTokenId(tokenId: string): Promise<RefreshTokenSession | null>;
  rotate(input: RotateRefreshTokenSessionInput): Promise<boolean>;
  revoke(tokenId: string, reason: string, revokedAt?: Date): Promise<boolean>;
  revokeDescendantChain(tokenId: string, reason: string, revokedAt?: Date): Promise<void>;
}
