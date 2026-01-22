"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
class RolesService {
    constructor(roleRepository, userRoleRepository) {
        this.roleRepository = roleRepository;
        this.userRoleRepository = userRoleRepository;
    }
    async createRole(name, description) {
        if (!name) {
            throw new Error("El nombre del rol es obligatorio.");
        }
        return this.roleRepository.create(name, description);
    }
    async listRoles() {
        return this.roleRepository.list();
    }
    async assignRole(username, roleId) {
        if (!username) {
            throw new Error("El usuario es obligatorio.");
        }
        if (!roleId) {
            throw new Error("El rol es obligatorio.");
        }
        return this.userRoleRepository.assign(username, roleId);
    }
}
exports.RolesService = RolesService;
