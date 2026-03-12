import { AuthError } from "@proodos/application/Errors/AuthError";
import { LdapAuthProvider } from "@proodos/application/Interfaces/ILdapAuthProvider";
import { UserRoleRepository } from "@proodos/application/Interfaces/IUserRoleRepository";
import { normalizeUsername, resolveAllowedRoles } from "./AuthRoleResolver";

export interface LoginResult {
  username: string;
  roles: string[];
}

export class LoginService {
  constructor(
    private readonly ldapAuthProvider: LdapAuthProvider,
    private readonly userRoleRepository: UserRoleRepository
  ) {}

  async execute(username: string, password: string): Promise<LoginResult> {
    if (!username || !password) {
      throw new AuthError("Usuario y contraseña son obligatorios.");
    }

    const isValid = await this.ldapAuthProvider.authenticate(username, password);
    if (!isValid) {
      throw new AuthError("Credenciales inválidas.");
    }

    const normalizedUsername = normalizeUsername(username);
    const roles = await this.userRoleRepository.getRolesByUsername(normalizedUsername);
    const allowedRoles = resolveAllowedRoles(roles);

    if (allowedRoles.length === 0) {
      throw new AuthError("Usuario sin roles asignados.");
    }

    return {
      username: normalizedUsername,
      roles: allowedRoles,
    };
  }
}
