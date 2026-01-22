"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeUserRoleRepository = void 0;
const RoleModel_1 = require("@proodos/infrastructure/Persistence/Models/RoleModel");
const UserRoleModel_1 = require("@proodos/infrastructure/Persistence/Models/UserRoleModel");
class SequelizeUserRoleRepository {
    async assign(username, roleId) {
        const record = await UserRoleModel_1.UserRoleModel.create({ username, roleId });
        return record.toJSON();
    }
    async getRolesByUsername(username) {
        const records = await UserRoleModel_1.UserRoleModel.findAll({
            where: { username },
            include: [{ model: RoleModel_1.RoleModel, as: "role" }],
            order: [["createdAt", "DESC"]],
        });
        return records
            .map((record) => record.get("role"))
            .filter(Boolean)
            .map((role) => role.toJSON());
    }
}
exports.SequelizeUserRoleRepository = SequelizeUserRoleRepository;
