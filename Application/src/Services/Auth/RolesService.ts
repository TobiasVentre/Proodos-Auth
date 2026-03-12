import { Role } from "@proodos/domain/Entities/Role";
import { UserRole } from "@proodos/domain/Entities/UserRole";
import { RoleRepository } from "@proodos/application/Interfaces/IRoleRepository";
import { UserRoleRepository } from "@proodos/application/Interfaces/IUserRoleRepository";
import { RoleCommandsService } from "@proodos/application/Services/Auth/RoleCommandsService";
import { RoleQueriesService } from "@proodos/application/Services/Auth/RoleQueriesService";

export class RolesService {
  private readonly commands: RoleCommandsService;
  private readonly queries: RoleQueriesService;

  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userRoleRepository: UserRoleRepository
  ) {
    this.commands = new RoleCommandsService(this.roleRepository, this.userRoleRepository);
    this.queries = new RoleQueriesService(this.roleRepository);
  }

  async createRole(name: string, description?: string | null): Promise<Role> {
    return this.commands.createRole(name, description);
  }

  async listRoles(): Promise<Role[]> {
    return this.queries.listRoles();
  }

  async assignRole(username: string, roleId: number): Promise<UserRole> {
    return this.commands.assignRole(username, roleId);
  }
}
