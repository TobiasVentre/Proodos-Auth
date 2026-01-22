import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { CreateTipoElementoDTO } from "../DTOs/TipoElemento/CreateTipoElementoDTO";
import { PatchTipoElementoDTO } from "../DTOs/TipoElemento/PatchTipoElementoDTO";
import { UpdateTipoElementoDTO } from "../DTOs/TipoElemento/UpdateTipoElementoDTO";

export interface CreateTipoElementoUseCase {
  execute(dto: CreateTipoElementoDTO): Promise<TipoElemento>;
}

export interface GetAllTiposElementoUseCase {
  execute(): Promise<TipoElemento[]>;
}

export interface GetTipoElementoByIdUseCase {
  execute(id_tipo_elemento: number): Promise<TipoElemento | null>;
}

export interface UpdateTipoElementoUseCase {
  execute(dto: UpdateTipoElementoDTO): Promise<TipoElemento>;
}

export interface PatchTipoElementoUseCase {
  execute(
    id_tipo_elemento: number,
    dto: PatchTipoElementoDTO
  ): Promise<TipoElemento>;
}

export interface DeleteTipoElementoUseCase {
  execute(id_tipo_elemento: number): Promise<void>;
}
