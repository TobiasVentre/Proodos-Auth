import { Role } from "@proodos/domain/Entities/Role";
import { UserRole } from "@proodos/domain/Entities/UserRole";

export interface UserRoleRepository {
  assign(username: string, roleId: number): Promise<UserRole>;
  getRolesByUsername(username: string): Promise<Role[]>;
  hasRole(username: string, roleId: number): Promise<boolean>;
}
