import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { PatchTipoElementoDTO } from "../DTOs/TipoElemento/PatchTipoElementoDTO";

export interface ITipoElementoRepository {
  create(entity: TipoElemento): Promise<TipoElemento>;
  update(entity: TipoElemento): Promise<TipoElemento>;
  patch(id_tipo_elemento: number, dto: PatchTipoElementoDTO): Promise<TipoElemento>;
  getById(id_tipo_elemento: number): Promise<TipoElemento | null>;
  getAll(): Promise<TipoElemento[]>;
  delete(id_tipo_elemento: number): Promise<void>;
  exists(id_tipo_elemento: number): Promise<boolean>;
}
