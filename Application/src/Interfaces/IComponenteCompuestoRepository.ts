import { ComponenteCompuesto } from "@proodos/domain/Entities/ComponenteCompuesto";

export interface IComponenteCompuestoRepository {
  assign(id_padre: number, id_hijo: number): Promise<{ created: boolean }>;
  unassign(id_padre: number, id_hijo: number): Promise<void>;
  getAll(): Promise<ComponenteCompuesto[]>;
}
