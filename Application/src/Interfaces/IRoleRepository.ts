import { Role } from "@proodos/domain/Entities/Role";

export interface RoleRepository {
  create(name: string, description?: string | null): Promise<Role>;
  list(): Promise<Role[]>;
}
