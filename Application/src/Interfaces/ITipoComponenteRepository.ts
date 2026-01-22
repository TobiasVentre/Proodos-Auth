import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { PatchTipoComponenteDTO } from "../DTOs/TipoComponente/PatchTipoComponenteDTO";

export interface ITipoComponenteRepository {
  create(entity: TipoComponente): Promise<TipoComponente>;
  update(entity: TipoComponente): Promise<TipoComponente>;
  patch(id_tipo_componente: number, dto: PatchTipoComponenteDTO): Promise<TipoComponente>;
  getById(id_tipo_componente: number): Promise<TipoComponente | null>;
  getAll(): Promise<TipoComponente[]>;
  exists(id_tipo_componente: number): Promise<boolean>;
}
