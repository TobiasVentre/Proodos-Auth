import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { CreateTipoComponenteDTO } from "../DTOs/TipoComponente/CreateTipoComponenteDTO";
import { PatchTipoComponenteDTO } from "../DTOs/TipoComponente/PatchTipoComponenteDTO";
import { UpdateTipoComponenteDTO } from "../DTOs/TipoComponente/UpdateTipoComponenteDTO";

export interface CreateTipoComponenteUseCase {
  execute(dto: CreateTipoComponenteDTO): Promise<TipoComponente>;
}

export interface GetAllTiposComponenteUseCase {
  execute(): Promise<TipoComponente[]>;
}

export interface GetTipoComponenteByIdUseCase {
  execute(id_tipo_componente: number): Promise<TipoComponente | null>;
}

export interface UpdateTipoComponenteUseCase {
  execute(dto: UpdateTipoComponenteDTO): Promise<TipoComponente>;
}

export interface PatchTipoComponenteUseCase {
  execute(
    id_tipo_componente: number,
    dto: PatchTipoComponenteDTO
  ): Promise<TipoComponente>;
}
