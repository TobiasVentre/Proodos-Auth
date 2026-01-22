import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { PatchTipoVariacionDTO } from "../DTOs/TipoVariacion/PatchTipoVariacionDTO";

export interface ITipoVariacionRepository {
  create(entity: TipoVariacion): Promise<TipoVariacion>;
  update(entity: TipoVariacion): Promise<TipoVariacion>;
  patch(id_tipo_variacion: number, dto: PatchTipoVariacionDTO): Promise<TipoVariacion>;
  getById(id_tipo_variacion: number): Promise<TipoVariacion | null>;
  getAll(): Promise<TipoVariacion[]>;
  getByTipoComponente(id_tipo_componente: number): Promise<TipoVariacion[]>;
}
