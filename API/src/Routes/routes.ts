import { Router } from "express";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { createComponenteController } from "../Controllers/ComponenteController";
import { createLandingPageController } from "../Controllers/LandingPageController";
import { createPlanController } from "../Controllers/PlanController";
import { createTipoComponenteController } from "../Controllers/TipoComponenteController";
import { createTipoElementoController } from "../Controllers/TipoElementoController";
import { createTipoVariacionController } from "../Controllers/TipoVariacionController";
import { createElementoComponenteController } from "../Controllers/ElementoComponenteController";
import { buildApiUseCases } from "@proodos/api/CompositionRoot/ApiContainer";

export const buildRoutes = async (logger: ILogger) => {
  const routes = Router();
  const useCases = await buildApiUseCases(logger);

  routes.use(
    "/componentes",
    createComponenteController({
      createComponenteService: useCases.componente.createComponente,
      getAllComponentesService: useCases.componente.getAllComponentes,
      getComponenteByIdService: useCases.componente.getComponenteById,
      patchComponenteService: useCases.componente.patchComponente,
      deleteComponenteService: useCases.componente.deleteComponente,
      softDeleteComponenteService: useCases.componente.softDeleteComponente,
      getLandingsByComponenteService: useCases.componente.getLandingsByComponente,
      assignComponenteHijoService: useCases.componente.assignComponenteHijo,
      unassignComponenteHijoService: useCases.componente.unassignComponenteHijo,
      getComponenteTreeService: useCases.componente.getComponenteTree,
    })
  );
  routes.use(
    "/landings",
    createLandingPageController({
      createLandingPageService: useCases.landing.createLandingPage,
      getLandingPageByIdService: useCases.landing.getLandingPageById,
      getAllLandingPagesService: useCases.landing.getAllLandingPages,
      updateLandingPageService: useCases.landing.updateLandingPage,
      patchLandingPageService: useCases.landing.patchLandingPage,
      deleteLandingPageService: useCases.landing.deleteLandingPage,
      assignLandingComponenteService: useCases.landing.assignLandingComponente,
      unassignLandingComponenteService: useCases.landing.unassignLandingComponente,
      getLandingComponentesService: useCases.landing.getLandingComponentes,
    })
  );
  routes.use(
    "/planes",
    createPlanController({
      createPlanService: useCases.plan.createPlan,
      getAllPlansService: useCases.plan.getAllPlans,
      getPlanByIdService: useCases.plan.getPlanById,
      patchPlanService: useCases.plan.patchPlan,
      updatePlanService: useCases.plan.updatePlan,
      getComponentesByPlanService: useCases.componente.getComponentesByPlan,
    })
  );
  routes.use(
    "/tipos-componente",
    createTipoComponenteController({
      createTipoComponenteService: useCases.tipoComponente.createTipoComponente,
      getAllTiposComponenteService: useCases.tipoComponente.getAllTiposComponente,
      getTipoComponenteByIdService: useCases.tipoComponente.getTipoComponenteById,
      updateTipoComponenteService: useCases.tipoComponente.updateTipoComponente,
      patchTipoComponenteService: useCases.tipoComponente.patchTipoComponente,
    })
  );
  routes.use(
    "/tipos-variacion",
    createTipoVariacionController({
      createTipoVariacionService: useCases.tipoVariacion.createTipoVariacion,
      getAllTiposVariacionService: useCases.tipoVariacion.getAllTiposVariacion,
      getTipoVariacionByIdService: useCases.tipoVariacion.getTipoVariacionById,
      getVariacionesByTipoComponenteService:
        useCases.tipoVariacion.getVariacionesByTipoComponente,
      updateTipoVariacionService: useCases.tipoVariacion.updateTipoVariacion,
      patchTipoVariacionService: useCases.tipoVariacion.patchTipoVariacion,
    })
  );
  routes.use(
    "/tipos-elemento",
    createTipoElementoController({
      createTipoElementoService: useCases.tipoElemento.createTipoElemento,
      getAllTiposElementoService: useCases.tipoElemento.getAllTiposElemento,
      getTipoElementoByIdService: useCases.tipoElemento.getTipoElementoById,
      updateTipoElementoService: useCases.tipoElemento.updateTipoElemento,
      patchTipoElementoService: useCases.tipoElemento.patchTipoElemento,
      deleteTipoElementoService: useCases.tipoElemento.deleteTipoElemento,
    })
  );
  routes.use(
    "/elementos-componente",
    createElementoComponenteController({
      createElementoComponenteService: useCases.elementoComponente.createElementoComponente,
      getAllElementosComponenteService: useCases.elementoComponente.getAllElementosComponente,
      getElementoComponenteByIdService:
        useCases.elementoComponente.getElementoComponenteById,
      getElementosByComponenteService:
        useCases.elementoComponente.getElementosByComponente,
      updateElementoComponenteService: useCases.elementoComponente.updateElementoComponente,
      patchElementoComponenteService: useCases.elementoComponente.patchElementoComponente,
      deleteElementoComponenteService: useCases.elementoComponente.deleteElementoComponente,
    })
  );

  return routes;
};
