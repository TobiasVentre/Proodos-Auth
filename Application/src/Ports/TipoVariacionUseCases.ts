import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { CreateTipoVariacionDTO } from "../DTOs/TipoVariacion/CreateTipoVariacionDTO";
import { PatchTipoVariacionDTO } from "../DTOs/TipoVariacion/PatchTipoVariacionDTO";
import { UpdateTipoVariacionDTO } from "../DTOs/TipoVariacion/UpdateTipoVariacionDTO";

export interface CreateTipoVariacionUseCase {
  execute(dto: CreateTipoVariacionDTO): Promise<TipoVariacion>;
}

export interface GetAllTiposVariacionUseCase {
  execute(): Promise<TipoVariacion[]>;
}

export interface GetTipoVariacionByIdUseCase {
  execute(id_tipo_variacion: number): Promise<TipoVariacion | null>;
}

export interface GetVariacionesByTipoComponenteUseCase {
  execute(id_tipo_componente: number): Promise<TipoVariacion[]>;
}

export interface UpdateTipoVariacionUseCase {
  execute(dto: UpdateTipoVariacionDTO): Promise<TipoVariacion>;
}

export interface PatchTipoVariacionUseCase {
  execute(
    id_tipo_variacion: number,
    dto: PatchTipoVariacionDTO
  ): Promise<TipoVariacion>;
}
