import { DataTypes, type QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable("refresh_token_sessions", {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      token_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      issued_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      revoked_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      revoke_reason: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      replaced_by_token_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });

    await queryInterface.addIndex(
      "refresh_token_sessions",
      ["username", "revoked_at", "expires_at"],
      {
        name: "refresh_token_sessions_username_revoked_expires_idx",
      }
    );
    await queryInterface.addIndex("refresh_token_sessions", ["replaced_by_token_id"], {
      name: "refresh_token_sessions_replaced_by_idx",
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeIndex(
      "refresh_token_sessions",
      "refresh_token_sessions_username_revoked_expires_idx"
    );
    await queryInterface.removeIndex(
      "refresh_token_sessions",
      "refresh_token_sessions_replaced_by_idx"
    );
    await queryInterface.dropTable("refresh_token_sessions");
  },
};
