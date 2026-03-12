import { Role } from "@proodos/domain/Entities/Role";
import { UserRole } from "@proodos/domain/Entities/UserRole";

export interface RoleCommands {
  createRole(name: string, description?: string | null): Promise<Role>;
  assignRole(username: string, roleId: number): Promise<UserRole>;
}
