import { RoleModel } from "@proodos/infrastructure/Persistence/Models/RoleModel";
import { UserRoleModel } from "@proodos/infrastructure/Persistence/Models/UserRoleModel";

RoleModel.hasMany(UserRoleModel, { foreignKey: "roleId", as: "userRoles" });
UserRoleModel.belongsTo(RoleModel, { foreignKey: "roleId", as: "role" });

export const models = {
  RoleModel,
  UserRoleModel,
};
