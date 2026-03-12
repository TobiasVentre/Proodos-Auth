import { DataTypes, Model } from "sequelize";
import { sequelize } from "@proodos/infrastructure/Config/SequelizeConfig";

export class RefreshTokenSessionModel extends Model {
  declare id: number;
  declare tokenId: string;
  declare username: string;
  declare issuedAt: Date;
  declare expiresAt: Date;
  declare revokedAt: Date | null;
  declare revokeReason: string | null;
  declare replacedByTokenId: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

RefreshTokenSessionModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tokenId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: "token_id",
    },
    username: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    issuedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "issued_at",
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "expires_at",
    },
    revokedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "revoked_at",
    },
    revokeReason: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "revoke_reason",
    },
    replacedByTokenId: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "replaced_by_token_id",
    },
  },
  {
    sequelize,
    tableName: "refresh_token_sessions",
    indexes: [
      {
        unique: true,
        fields: ["token_id"],
      },
      {
        fields: ["username", "revoked_at", "expires_at"],
      },
      {
        fields: ["replaced_by_token_id"],
      },
    ],
  }
);
