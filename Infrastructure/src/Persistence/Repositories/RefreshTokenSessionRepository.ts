import { RefreshTokenSession } from "@proodos/domain/Entities/RefreshTokenSession";
import {
  CreateRefreshTokenSessionInput,
  RefreshTokenSessionRepository,
  RotateRefreshTokenSessionInput,
} from "@proodos/application/Interfaces/IRefreshTokenSessionRepository";
import { sequelize } from "@proodos/infrastructure/Config/SequelizeConfig";
import { RefreshTokenSessionModel } from "@proodos/infrastructure/Persistence/Models/RefreshTokenSessionModel";

const toEntity = (record: RefreshTokenSessionModel): RefreshTokenSession => {
  const json = record.toJSON() as RefreshTokenSession;

  return {
    ...json,
    issuedAt: new Date(json.issuedAt),
    expiresAt: new Date(json.expiresAt),
    revokedAt: json.revokedAt ? new Date(json.revokedAt) : null,
    createdAt: new Date(json.createdAt),
    updatedAt: new Date(json.updatedAt),
  };
};

export class SequelizeRefreshTokenSessionRepository implements RefreshTokenSessionRepository {
  async create(input: CreateRefreshTokenSessionInput): Promise<RefreshTokenSession> {
    const record = await RefreshTokenSessionModel.create({
      tokenId: input.tokenId,
      username: input.username,
      issuedAt: input.issuedAt,
      expiresAt: input.expiresAt,
    });

    return toEntity(record);
  }

  async findByTokenId(tokenId: string): Promise<RefreshTokenSession | null> {
    const record = await RefreshTokenSessionModel.findOne({
      where: { tokenId },
    });

    return record ? toEntity(record) : null;
  }

  async rotate(input: RotateRefreshTokenSessionInput): Promise<boolean> {
    return sequelize.transaction(async (transaction) => {
      const rotatedAt = input.rotatedAt ?? new Date();
      const [updatedCount] = await RefreshTokenSessionModel.update(
        {
          revokedAt: rotatedAt,
          revokeReason: "rotated",
          replacedByTokenId: input.tokenId,
        },
        {
          where: {
            tokenId: input.currentTokenId,
            username: input.username,
            revokedAt: null,
            replacedByTokenId: null,
          },
          transaction,
        }
      );

      if (updatedCount !== 1) {
        return false;
      }

      await RefreshTokenSessionModel.create(
        {
          tokenId: input.tokenId,
          username: input.username,
          issuedAt: input.issuedAt,
          expiresAt: input.expiresAt,
        },
        { transaction }
      );

      return true;
    });
  }

  async revoke(tokenId: string, reason: string, revokedAt = new Date()): Promise<boolean> {
    const [updatedCount] = await RefreshTokenSessionModel.update(
      {
        revokedAt,
        revokeReason: reason,
      },
      {
        where: {
          tokenId,
          revokedAt: null,
        },
      }
    );

    return updatedCount > 0;
  }

  async revokeDescendantChain(tokenId: string, reason: string, revokedAt = new Date()): Promise<void> {
    let currentTokenId = tokenId.trim();
    const visited = new Set<string>();

    while (currentTokenId && !visited.has(currentTokenId)) {
      visited.add(currentTokenId);
      const record = await RefreshTokenSessionModel.findOne({
        where: { tokenId: currentTokenId },
      });

      if (!record) {
        return;
      }

      if (!record.revokedAt) {
        record.revokedAt = revokedAt;
        record.revokeReason = reason;
        await record.save();
      }

      currentTokenId = record.replacedByTokenId?.trim() ?? "";
    }
  }
}
