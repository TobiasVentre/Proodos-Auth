export interface RefreshTokenSession {
  id: number;
  tokenId: string;
  username: string;
  issuedAt: Date;
  expiresAt: Date;
  revokedAt?: Date | null;
  revokeReason?: string | null;
  replacedByTokenId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
