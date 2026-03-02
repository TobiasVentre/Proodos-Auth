import { Role } from "@proodos/domain/Entities/Role";

export interface RoleQueries {
  listRoles(): Promise<Role[]>;
}
