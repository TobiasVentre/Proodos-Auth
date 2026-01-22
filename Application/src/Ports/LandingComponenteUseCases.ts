import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";

export interface AssignLandingComponenteUseCase {
  execute(
    id_landing: number,
    id_componente: number
  ): Promise<{ data: LandingComponente; existed: boolean }>;
}

export interface UnassignLandingComponenteUseCase {
  execute(id_landing: number, id_componente: number): Promise<void>;
}

export interface GetLandingComponentesUseCase {
  execute(id_landing: number): Promise<LandingComponente[]>;
}

export interface GetLandingsByComponenteUseCase {
  execute(id_componente: number): Promise<LandingComponente[]>;
}
