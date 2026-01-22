import { LoginService } from "@proodos/application/Services/Auth/LoginService";
import { RolesService } from "@proodos/application/Services/Auth/RolesService";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { initializeDatabase } from "@proodos/infrastructure/Persistence/Sequelize";
import { SequelizeRoleRepository } from "@proodos/infrastructure/Persistence/Repositories/RoleRepository";
import { SequelizeUserRoleRepository } from "@proodos/infrastructure/Persistence/Repositories/UserRoleRepository";
import { LdapAuthProviderService } from "@proodos/infrastructure/Services/LdapAuthProvider";

export const buildApiUseCases = async (logger: ILogger) => {
  await initializeDatabase();
  logger.info("Base de datos inicializada");

  const roleRepository = new SequelizeRoleRepository();
  const userRoleRepository = new SequelizeUserRoleRepository();
  const ldapAuthProvider = new LdapAuthProviderService();

  return {
    auth: {
      login: new LoginService(ldapAuthProvider, userRoleRepository),
    },
    roles: new RolesService(roleRepository, userRoleRepository),
  };
};
