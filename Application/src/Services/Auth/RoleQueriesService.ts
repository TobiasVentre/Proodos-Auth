import { Role } from "@proodos/domain/Entities/Role";
import { RoleRepository } from "@proodos/application/Interfaces/IRoleRepository";
import { RoleQueries } from "@proodos/application/Ports/Auth/RoleQueries";

export class RoleQueriesService implements RoleQueries {
  constructor(private readonly roleRepository: RoleRepository) {}

  async listRoles(): Promise<Role[]> {
    return this.roleRepository.list();
  }
}
