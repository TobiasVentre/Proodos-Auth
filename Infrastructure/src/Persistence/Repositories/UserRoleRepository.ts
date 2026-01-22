import { Role } from "@proodos/domain/Entities/Role";
import { UserRole } from "@proodos/domain/Entities/UserRole";
import { UserRoleRepository } from "@proodos/application/Interfaces/IUserRoleRepository";
import { RoleModel } from "@proodos/infrastructure/Persistence/Models/RoleModel";
import { UserRoleModel } from "@proodos/infrastructure/Persistence/Models/UserRoleModel";

export class SequelizeUserRoleRepository implements UserRoleRepository {
  async assign(username: string, roleId: number): Promise<UserRole> {
    const record = await UserRoleModel.create({ username, roleId });
    return record.toJSON() as UserRole;
  }

  async getRolesByUsername(username: string): Promise<Role[]> {
    const records = await UserRoleModel.findAll({
      where: { username },
      include: [{ model: RoleModel, as: "role" }],
      order: [["createdAt", "DESC"]],
    });

    return records
      .map((record) => record.get("role"))
      .filter(Boolean)
      .map((role) => (role as RoleModel).toJSON() as Role);
  }
}
