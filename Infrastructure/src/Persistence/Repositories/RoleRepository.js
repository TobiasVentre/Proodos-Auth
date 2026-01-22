"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeRoleRepository = void 0;
const RoleModel_1 = require("@proodos/infrastructure/Persistence/Models/RoleModel");
class SequelizeRoleRepository {
    async create(name, description) {
        const role = await RoleModel_1.RoleModel.create({ name, description: description ?? null });
        return role.toJSON();
    }
    async list() {
        const roles = await RoleModel_1.RoleModel.findAll({ order: [["name", "ASC"]] });
        return roles.map((role) => role.toJSON());
    }
}
exports.SequelizeRoleRepository = SequelizeRoleRepository;
