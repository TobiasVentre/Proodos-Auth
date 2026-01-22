import { Role } from "@proodos/domain/Entities/Role";
import { UserRole } from "@proodos/domain/Entities/UserRole";
import { RoleRepository } from "@proodos/application/Interfaces/IRoleRepository";
import { UserRoleRepository } from "@proodos/application/Interfaces/IUserRoleRepository";

export class RolesService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userRoleRepository: UserRoleRepository
  ) {}

  async createRole(name: string, description?: string | null): Promise<Role> {
    if (!name) {
      throw new Error("El nombre del rol es obligatorio.");
    }

    return this.roleRepository.create(name, description);
  }

  async listRoles(): Promise<Role[]> {
    return this.roleRepository.list();
  }

  async assignRole(username: string, roleId: number): Promise<UserRole> {
    if (!username) {
      throw new Error("El usuario es obligatorio.");
    }

    if (!roleId) {
      throw new Error("El rol es obligatorio.");
    }

    return this.userRoleRepository.assign(username, roleId);
  }
}
