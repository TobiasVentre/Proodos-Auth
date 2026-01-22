import { Role } from "@proodos/domain/Entities/Role";
import { RoleRepository } from "@proodos/application/Interfaces/IRoleRepository";
import { RoleModel } from "@proodos/infrastructure/Persistence/Models/RoleModel";

export class SequelizeRoleRepository implements RoleRepository {
  async create(name: string, description?: string | null): Promise<Role> {
    const role = await RoleModel.create({ name, description: description ?? null });

    return role.toJSON() as Role;
  }

  async list(): Promise<Role[]> {
    const roles = await RoleModel.findAll({ order: [["name", "ASC"]] });
    return roles.map((role) => role.toJSON() as Role);
  }
}
