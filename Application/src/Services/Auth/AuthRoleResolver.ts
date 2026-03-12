import { Role } from "@proodos/domain/Entities/Role";

const ALLOWED_ROLES = new Set(["admin", "diseñador", "desarrollador"]);

export const normalizeUsername = (username: string): string => {
  if (username.includes("\\")) {
    return username.split("\\").pop() ?? username;
  }

  if (username.includes("@")) {
    return username.split("@")[0] ?? username;
  }

  return username;
};

export const resolveAllowedRoles = (roles: Role[]): string[] =>
  roles
    .map((role) => role.name.trim().toLowerCase())
    .filter((roleName) => ALLOWED_ROLES.has(roleName));
