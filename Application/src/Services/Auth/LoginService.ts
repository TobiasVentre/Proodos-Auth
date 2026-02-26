import { AuthError } from "@proodos/application/Errors/AuthError";
import { LdapAuthProvider } from "@proodos/application/Interfaces/ILdapAuthProvider";
import { UserRoleRepository } from "@proodos/application/Interfaces/IUserRoleRepository";

export interface LoginResult {
  username: string;
  roles: string[];
}

const normalizeUsername = (username: string): string => {
  if (username.includes("\\")) {
    return username.split("\\").pop() ?? username;
  }

  if (username.includes("@")) {
    return username.split("@")[0] ?? username;
  }

  return username;
};

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

    return {
      username: normalizedUsername,
      roles: roles.map((role) => role.name),
    };
  }
}
