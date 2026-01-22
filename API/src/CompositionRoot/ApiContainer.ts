import { ILogger } from "@proodos/application/Interfaces/ILogger";
import {
  CreateComponenteUseCase,
  DeleteComponenteUseCase,
  SoftDeleteComponenteUseCase,
  GetAllComponentesUseCase,
  GetComponentesByPlanUseCase,
  GetComponenteByIdUseCase,
  GetComponenteTreeUseCase,
  PatchComponenteUseCase,
  AssignComponenteHijoUseCase,
  UnassignComponenteHijoUseCase,
} from "@proodos/application/Ports/ComponenteUseCases";
import {
  CreateLandingPageUseCase,
  DeleteLandingPageUseCase,
  GetAllLandingPagesUseCase,
  GetLandingPageByIdUseCase,
  PatchLandingPageUseCase,
  UpdateLandingPageUseCase,
} from "@proodos/application/Ports/LandingPageUseCases";
import {
  CreatePlanUseCase,
  GetAllPlansUseCase,
  GetPlanByIdUseCase,
  PatchPlanUseCase,
  UpdatePlanUseCase,
} from "@proodos/application/Ports/PlanUseCases";
import {
  CreateTipoComponenteUseCase,
  GetAllTiposComponenteUseCase,
  GetTipoComponenteByIdUseCase,
  PatchTipoComponenteUseCase,
  UpdateTipoComponenteUseCase,
} from "@proodos/application/Ports/TipoComponenteUseCases";
import {
  CreateTipoVariacionUseCase,
  GetAllTiposVariacionUseCase,
  GetTipoVariacionByIdUseCase,
  GetVariacionesByTipoComponenteUseCase,
  PatchTipoVariacionUseCase,
  UpdateTipoVariacionUseCase,
} from "@proodos/application/Ports/TipoVariacionUseCases";
import {
  CreateTipoElementoUseCase,
  DeleteTipoElementoUseCase,
  GetAllTiposElementoUseCase,
  GetTipoElementoByIdUseCase,
  PatchTipoElementoUseCase,
  UpdateTipoElementoUseCase,
} from "@proodos/application/Ports/TipoElementoUseCases";
import {
  CreateElementoComponenteUseCase,
  DeleteElementoComponenteUseCase,
  GetAllElementosComponenteUseCase,
  GetElementoComponenteByIdUseCase,
  GetElementosByComponenteUseCase,
  PatchElementoComponenteUseCase,
  UpdateElementoComponenteUseCase,
} from "@proodos/application/Ports/ElementoComponenteUseCases";
import {
  AssignLandingComponenteUseCase,
  GetLandingComponentesUseCase,
  GetLandingsByComponenteUseCase,
  UnassignLandingComponenteUseCase,
} from "@proodos/application/Ports/LandingComponenteUseCases";
import { CreateComponenteService } from "@proodos/application/Services/Componente/CreateComponenteService";
import { DeleteComponenteService } from "@proodos/application/Services/Componente/DeleteComponenteService";
import { GetAllComponentesService } from "@proodos/application/Services/Componente/GetAllComponentesService";
import { GetComponentesByPlanService } from "@proodos/application/Services/Componente/GetComponentesByPlanService";
import { GetComponenteByIdService } from "@proodos/application/Services/Componente/GetComponenteByIdService";
import { PatchComponenteService } from "@proodos/application/Services/Componente/PatchComponenteService";
import { SoftDeleteComponenteService } from "@proodos/application/Services/Componente/SoftDeleteComponenteService";
import { AssignComponenteHijoService } from "@proodos/application/Services/Componente/AssignComponenteHijoService";
import { UnassignComponenteHijoService } from "@proodos/application/Services/Componente/UnassignComponenteHijoService";
import { GetComponenteTreeService } from "@proodos/application/Services/Componente/GetComponenteTreeService";
import { GetLandingComponentesService } from "@proodos/application/Services/LandingComponente/GetLandingComponentesService";
import { GetLandingsByComponenteService } from "@proodos/application/Services/LandingComponente/GetLandingsByComponenteService";
import { CreateLandingPageService } from "@proodos/application/Services/LandingPage/CreateLandingPageService";
import { GetAllLandingPagesService } from "@proodos/application/Services/LandingPage/GetAllLandingPagesService";
import { GetLandingPageByIdService } from "@proodos/application/Services/LandingPage/GetLandingPageByIdService";
import { PatchLandingPageService } from "@proodos/application/Services/LandingPage/PatchLandingPageService";
import { UpdateLandingPageService } from "@proodos/application/Services/LandingPage/UpdateLandingPageService";
import { DeleteLandingPageService } from "@proodos/application/Services/LandingPage/DeleteLandingPageService";
import { CreatePlanService } from "@proodos/application/Services/Plan/CreatePlanService";
import { GetAllPlansService } from "@proodos/application/Services/Plan/GetAllPlansService";
import { GetPlanByIdService } from "@proodos/application/Services/Plan/GetPlanByIdService";
import { PatchPlanService } from "@proodos/application/Services/Plan/PatchPlanService";
import { UpdatePlanService } from "@proodos/application/Services/Plan/UpdatePlanService";
import { CreateTipoComponenteService } from "@proodos/application/Services/TipoComponente/CreateTipoComponenteService";
import { GetAllTiposComponenteService } from "@proodos/application/Services/TipoComponente/GetAllTiposComponenteService";
import { GetTipoComponenteByIdService } from "@proodos/application/Services/TipoComponente/GetTipoComponenteByIdService";
import { UpdateTipoComponenteService } from "@proodos/application/Services/TipoComponente/UpdateTipoComponenteService";
import { PatchTipoComponenteService } from "@proodos/application/Services/TipoComponente/PatchTipoComponenteService";
import { CreateTipoVariacionService } from "@proodos/application/Services/TipoVariacion/CreateTipoVariacionService";
import { GetAllTiposVariacionService } from "@proodos/application/Services/TipoVariacion/GetAllTiposVariacionService";
import { GetTipoVariacionByIdService } from "@proodos/application/Services/TipoVariacion/GetTipoVariacionByIdService";
import { GetVariacionesByTipoComponenteService } from "@proodos/application/Services/TipoVariacion/GetVariacionesByTipoComponenteService";
import { UpdateTipoVariacionService } from "@proodos/application/Services/TipoVariacion/UpdateTipoVariacionService";
import { PatchTipoVariacionService } from "@proodos/application/Services/TipoVariacion/PatchTipoVariacionService";
import { CreateTipoElementoService } from "@proodos/application/Services/TipoElemento/CreateTipoElementoService";
import { GetAllTiposElementoService } from "@proodos/application/Services/TipoElemento/GetAllTiposElementoService";
import { GetTipoElementoByIdService } from "@proodos/application/Services/TipoElemento/GetTipoElementoByIdService";
import { UpdateTipoElementoService } from "@proodos/application/Services/TipoElemento/UpdateTipoElementoService";
import { PatchTipoElementoService } from "@proodos/application/Services/TipoElemento/PatchTipoElementoService";
import { DeleteTipoElementoService } from "@proodos/application/Services/TipoElemento/DeleteTipoElementoService";
import { CreateElementoComponenteService } from "@proodos/application/Services/ElementoComponente/CreateElementoComponenteService";
import { GetAllElementosComponenteService } from "@proodos/application/Services/ElementoComponente/GetAllElementosComponenteService";
import { GetElementoComponenteByIdService } from "@proodos/application/Services/ElementoComponente/GetElementoComponenteByIdService";
import { GetElementosByComponenteService } from "@proodos/application/Services/ElementoComponente/GetElementosByComponenteService";
import { UpdateElementoComponenteService } from "@proodos/application/Services/ElementoComponente/UpdateElementoComponenteService";
import { PatchElementoComponenteService } from "@proodos/application/Services/ElementoComponente/PatchElementoComponenteService";
import { DeleteElementoComponenteService } from "@proodos/application/Services/ElementoComponente/DeleteElementoComponenteService";
import { AssignLandingComponenteService } from "@proodos/application/Services/LandingComponente/AssignLandingComponenteService";
import { UnassignComponenteFromLandingService } from "@proodos/application/Services/LandingComponente/UnassignComponenteFromLandingService";
import { ComponenteRepository } from "@proodos/infrastructure/Persistence/Repositories/ComponenteRepository";
import { ComponenteCompuestoRepository } from "@proodos/infrastructure/Persistence/Repositories/ComponenteCompuestoRepository";
import { LandingComponenteRepository } from "@proodos/infrastructure/Persistence/Repositories/LandingComponenteRepository";
import { LandingPageRepository } from "@proodos/infrastructure/Persistence/Repositories/LandingPageRepository";
import { PlanRepository } from "@proodos/infrastructure/Persistence/Repositories/PlanRepository";
import { TipoComponenteRepository } from "@proodos/infrastructure/Persistence/Repositories/TipoComponenteRepository";
import { TipoVariacionRepository } from "@proodos/infrastructure/Persistence/Repositories/TipoVariacionRepository";
import { TipoElementoRepository } from "@proodos/infrastructure/Persistence/Repositories/TipoElementoRepository";
import { ElementoComponenteRepository } from "@proodos/infrastructure/Persistence/Repositories/ElementoComponenteRepository";
import { initModels } from "@proodos/infrastructure/Persistence/Sequelize";

export type ApiUseCases = {
  componente: {
    createComponente: CreateComponenteUseCase;
    getAllComponentes: GetAllComponentesUseCase;
    getComponenteById: GetComponenteByIdUseCase;
    patchComponente: PatchComponenteUseCase;
    deleteComponente: DeleteComponenteUseCase;
    softDeleteComponente: SoftDeleteComponenteUseCase;
    getComponentesByPlan: GetComponentesByPlanUseCase;
    getLandingsByComponente: GetLandingsByComponenteUseCase;
    assignComponenteHijo: AssignComponenteHijoUseCase;
    unassignComponenteHijo: UnassignComponenteHijoUseCase;
    getComponenteTree: GetComponenteTreeUseCase;
  };
  landing: {
    createLandingPage: CreateLandingPageUseCase;
    getAllLandingPages: GetAllLandingPagesUseCase;
    getLandingPageById: GetLandingPageByIdUseCase;
    updateLandingPage: UpdateLandingPageUseCase;
    patchLandingPage: PatchLandingPageUseCase;
    deleteLandingPage: DeleteLandingPageUseCase;
    assignLandingComponente: AssignLandingComponenteUseCase;
    unassignLandingComponente: UnassignLandingComponenteUseCase;
    getLandingComponentes: GetLandingComponentesUseCase;
  };
  plan: {
    createPlan: CreatePlanUseCase;
    getAllPlans: GetAllPlansUseCase;
    getPlanById: GetPlanByIdUseCase;
    patchPlan: PatchPlanUseCase;
    updatePlan: UpdatePlanUseCase;
  };
  tipoComponente: {
    createTipoComponente: CreateTipoComponenteUseCase;
    getAllTiposComponente: GetAllTiposComponenteUseCase;
    getTipoComponenteById: GetTipoComponenteByIdUseCase;
    updateTipoComponente: UpdateTipoComponenteUseCase;
    patchTipoComponente: PatchTipoComponenteUseCase;
  };
  tipoVariacion: {
    createTipoVariacion: CreateTipoVariacionUseCase;
    getAllTiposVariacion: GetAllTiposVariacionUseCase;
    getTipoVariacionById: GetTipoVariacionByIdUseCase;
    getVariacionesByTipoComponente: GetVariacionesByTipoComponenteUseCase;
    updateTipoVariacion: UpdateTipoVariacionUseCase;
    patchTipoVariacion: PatchTipoVariacionUseCase;
  };
  tipoElemento: {
    createTipoElemento: CreateTipoElementoUseCase;
    getAllTiposElemento: GetAllTiposElementoUseCase;
    getTipoElementoById: GetTipoElementoByIdUseCase;
    updateTipoElemento: UpdateTipoElementoUseCase;
    patchTipoElemento: PatchTipoElementoUseCase;
    deleteTipoElemento: DeleteTipoElementoUseCase;
  };
  elementoComponente: {
    createElementoComponente: CreateElementoComponenteUseCase;
    getAllElementosComponente: GetAllElementosComponenteUseCase;
    getElementoComponenteById: GetElementoComponenteByIdUseCase;
    getElementosByComponente: GetElementosByComponenteUseCase;
    updateElementoComponente: UpdateElementoComponenteUseCase;
    patchElementoComponente: PatchElementoComponenteUseCase;
    deleteElementoComponente: DeleteElementoComponenteUseCase;
  };
};

export const buildApiUseCases = async (logger: ILogger): Promise<ApiUseCases> => {
  await initModels();

  const componenteRepository = new ComponenteRepository(logger);
  const componenteCompuestoRepository = new ComponenteCompuestoRepository();
  const landingPageRepository = new LandingPageRepository(logger);
  const landingComponenteRepository = new LandingComponenteRepository();
  const planRepository = new PlanRepository(logger);
  const tipoComponenteRepository = new TipoComponenteRepository(logger);
  const tipoVariacionRepository = new TipoVariacionRepository(logger);
  const tipoElementoRepository = new TipoElementoRepository(logger);
  const elementoComponenteRepository = new ElementoComponenteRepository(logger);

  return {
    componente: {
      createComponente: new CreateComponenteService(componenteRepository, planRepository, logger),
      getAllComponentes: new GetAllComponentesService(componenteRepository),
      getComponenteById: new GetComponenteByIdService(componenteRepository),
      patchComponente: new PatchComponenteService(componenteRepository, planRepository),
      deleteComponente: new DeleteComponenteService(
        componenteRepository,
        landingComponenteRepository
      ),
      softDeleteComponente: new SoftDeleteComponenteService(
        componenteRepository,
        landingComponenteRepository
      ),
      getComponentesByPlan: new GetComponentesByPlanService(componenteRepository),
      getLandingsByComponente: new GetLandingsByComponenteService(landingComponenteRepository),
      assignComponenteHijo: new AssignComponenteHijoService(
        componenteRepository,
        componenteCompuestoRepository
      ),
      unassignComponenteHijo: new UnassignComponenteHijoService(componenteCompuestoRepository),
      getComponenteTree: new GetComponenteTreeService(
        componenteRepository,
        componenteCompuestoRepository
      ),
    },
    landing: {
      createLandingPage: new CreateLandingPageService(landingPageRepository, logger),
      getAllLandingPages: new GetAllLandingPagesService(landingPageRepository, logger),
      getLandingPageById: new GetLandingPageByIdService(landingPageRepository, logger),
      updateLandingPage: new UpdateLandingPageService(landingPageRepository),
      patchLandingPage: new PatchLandingPageService(landingPageRepository),
      deleteLandingPage: new DeleteLandingPageService(landingPageRepository),
      assignLandingComponente: new AssignLandingComponenteService(
        landingPageRepository,
        componenteRepository,
        landingComponenteRepository,
        logger
      ),
      unassignLandingComponente: new UnassignComponenteFromLandingService(
        landingComponenteRepository
      ),
      getLandingComponentes: new GetLandingComponentesService(landingComponenteRepository),
    },
    plan: {
      createPlan: new CreatePlanService(planRepository, logger),
      getAllPlans: new GetAllPlansService(planRepository, logger),
      getPlanById: new GetPlanByIdService(planRepository, logger),
      patchPlan: new PatchPlanService(planRepository, logger),
      updatePlan: new UpdatePlanService(planRepository, logger),
    },
    tipoComponente: {
      createTipoComponente: new CreateTipoComponenteService(
        tipoComponenteRepository,
        logger
      ),
      getAllTiposComponente: new GetAllTiposComponenteService(
        tipoComponenteRepository,
        logger
      ),
      getTipoComponenteById: new GetTipoComponenteByIdService(
        tipoComponenteRepository,
        logger
      ),
      updateTipoComponente: new UpdateTipoComponenteService(tipoComponenteRepository),
      patchTipoComponente: new PatchTipoComponenteService(tipoComponenteRepository),
    },
    tipoVariacion: {
      createTipoVariacion: new CreateTipoVariacionService(
        tipoVariacionRepository,
        tipoComponenteRepository,
        logger
      ),
      getAllTiposVariacion: new GetAllTiposVariacionService(
        tipoVariacionRepository,
        logger
      ),
      getTipoVariacionById: new GetTipoVariacionByIdService(
        tipoVariacionRepository,
        logger
      ),
      getVariacionesByTipoComponente: new GetVariacionesByTipoComponenteService(
        tipoVariacionRepository,
        logger
      ),
      updateTipoVariacion: new UpdateTipoVariacionService(
        tipoVariacionRepository,
        tipoComponenteRepository
      ),
      patchTipoVariacion: new PatchTipoVariacionService(
        tipoVariacionRepository,
        tipoComponenteRepository
      ),
    },
    tipoElemento: {
      createTipoElemento: new CreateTipoElementoService(tipoElementoRepository, logger),
      getAllTiposElemento: new GetAllTiposElementoService(tipoElementoRepository, logger),
      getTipoElementoById: new GetTipoElementoByIdService(tipoElementoRepository, logger),
      updateTipoElemento: new UpdateTipoElementoService(tipoElementoRepository),
      patchTipoElemento: new PatchTipoElementoService(tipoElementoRepository),
      deleteTipoElemento: new DeleteTipoElementoService(tipoElementoRepository),
    },
    elementoComponente: {
      createElementoComponente: new CreateElementoComponenteService(
        elementoComponenteRepository,
        componenteRepository,
        tipoElementoRepository,
        logger
      ),
      getAllElementosComponente: new GetAllElementosComponenteService(
        elementoComponenteRepository,
        logger
      ),
      getElementoComponenteById: new GetElementoComponenteByIdService(
        elementoComponenteRepository,
        logger
      ),
      getElementosByComponente: new GetElementosByComponenteService(
        elementoComponenteRepository,
        logger
      ),
      updateElementoComponente: new UpdateElementoComponenteService(
        elementoComponenteRepository,
        componenteRepository,
        tipoElementoRepository
      ),
      patchElementoComponente: new PatchElementoComponenteService(
        elementoComponenteRepository,
        componenteRepository,
        tipoElementoRepository
      ),
      deleteElementoComponente: new DeleteElementoComponenteService(
        elementoComponenteRepository
      ),
    },
  };
};
