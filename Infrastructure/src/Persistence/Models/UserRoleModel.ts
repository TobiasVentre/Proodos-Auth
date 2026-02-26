import { DataTypes, Model } from "sequelize";
import { sequelize } from "@proodos/infrastructure/Config/SequelizeConfig";

export class UserRoleModel extends Model {
  declare id: number;
  declare username: string;
  declare roleId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

UserRoleModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "role_id",
    },
  },
  {
    sequelize,
    tableName: "user_roles",
    indexes: [
      {
        unique: true,
        fields: ["username", "roleId"],
      },
    ],
  }
);
