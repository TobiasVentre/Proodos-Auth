import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";

export interface ILandingComponenteRepository {
  assign(component: LandingComponente): Promise<LandingComponente>;
  unassign(id_landing: number, id_componente: number): Promise<void>;
  getByLanding(id_landing: number): Promise<LandingComponente[]>;
  getByComponente(id_componente: number): Promise<LandingComponente[]>;
  exists(id_landing: number, id_componente: number): Promise<boolean>;
  existsByComponente(id_componente: number): Promise<boolean>;
}
