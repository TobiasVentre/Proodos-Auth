import { LoginService } from "@proodos/application/Services/Auth/LoginService";
import { RefreshTokenService } from "@proodos/application/Services/Auth/RefreshTokenService";
import { RevokeRefreshTokenService } from "@proodos/application/Services/Auth/RevokeRefreshTokenService";
import { RoleCommandsService } from "@proodos/application/Services/Auth/RoleCommandsService";
import { RoleQueriesService } from "@proodos/application/Services/Auth/RoleQueriesService";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { initializeDatabase } from "@proodos/infrastructure/Persistence/Sequelize";
import { SequelizeRefreshTokenSessionRepository } from "@proodos/infrastructure/Persistence/Repositories/RefreshTokenSessionRepository";
import { SequelizeRoleRepository } from "@proodos/infrastructure/Persistence/Repositories/RoleRepository";
import { SequelizeUserRoleRepository } from "@proodos/infrastructure/Persistence/Repositories/UserRoleRepository";
import { LdapAuthProviderService } from "@proodos/infrastructure/Services/LdapAuthProvider";

export const buildApiUseCases = async (logger: ILogger) => {
  await initializeDatabase();
  logger.info("Base de datos inicializada");

  const roleRepository = new SequelizeRoleRepository();
  const refreshTokenSessionRepository = new SequelizeRefreshTokenSessionRepository();
  const userRoleRepository = new SequelizeUserRoleRepository();
  const ldapAuthProvider = new LdapAuthProviderService();
  const roleCommands = new RoleCommandsService(roleRepository, userRoleRepository);
  const roleQueries = new RoleQueriesService(roleRepository);

  return {
    auth: {
      login: new LoginService(ldapAuthProvider, userRoleRepository),
      refresh: new RefreshTokenService(userRoleRepository, refreshTokenSessionRepository),
      revokeRefreshToken: new RevokeRefreshTokenService(refreshTokenSessionRepository),
    },
    roles: {
      commands: roleCommands,
      queries: roleQueries,
    },
  };
};
