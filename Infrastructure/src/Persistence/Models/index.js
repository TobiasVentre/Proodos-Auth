"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const RoleModel_1 = require("@proodos/infrastructure/Persistence/Models/RoleModel");
const UserRoleModel_1 = require("@proodos/infrastructure/Persistence/Models/UserRoleModel");
RoleModel_1.RoleModel.hasMany(UserRoleModel_1.UserRoleModel, { foreignKey: "roleId", as: "userRoles" });
UserRoleModel_1.UserRoleModel.belongsTo(RoleModel_1.RoleModel, { foreignKey: "roleId", as: "role" });
exports.models = {
    RoleModel: RoleModel_1.RoleModel,
    UserRoleModel: UserRoleModel_1.UserRoleModel,
};
