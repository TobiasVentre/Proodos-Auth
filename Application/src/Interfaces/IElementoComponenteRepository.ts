import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { PatchElementoComponenteDTO } from "../DTOs/ElementoComponente/PatchElementoComponenteDTO";

export interface IElementoComponenteRepository {
  create(entity: ElementoComponente): Promise<ElementoComponente>;
  update(entity: ElementoComponente): Promise<ElementoComponente>;
  patch(id_elemento: number, dto: PatchElementoComponenteDTO): Promise<ElementoComponente>;
  getById(id_elemento: number): Promise<ElementoComponente | null>;
  getAll(): Promise<ElementoComponente[]>;
  getByComponente(id_componente: number): Promise<ElementoComponente[]>;
  delete(id_elemento: number): Promise<void>;
}
