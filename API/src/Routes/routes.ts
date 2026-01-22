import { Router } from "express";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { createAuthController } from "@proodos/api/Controllers/AuthController";
import { createRolesController } from "@proodos/api/Controllers/RolesController";
import { buildApiUseCases } from "@proodos/api/CompositionRoot/ApiContainer";

export const buildRoutes = async (logger: ILogger) => {
  const routes = Router();
  const useCases = await buildApiUseCases(logger);

  routes.use("/auth", createAuthController({ loginService: useCases.auth.login }));
  routes.use("/roles", createRolesController({ rolesService: useCases.roles }));

  return routes;
};
