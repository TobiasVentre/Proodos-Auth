import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { CreateElementoComponenteDTO } from "../DTOs/ElementoComponente/CreateElementoComponenteDTO";
import { PatchElementoComponenteDTO } from "../DTOs/ElementoComponente/PatchElementoComponenteDTO";
import { UpdateElementoComponenteDTO } from "../DTOs/ElementoComponente/UpdateElementoComponenteDTO";

export interface CreateElementoComponenteUseCase {
  execute(dto: CreateElementoComponenteDTO): Promise<ElementoComponente>;
}

export interface GetAllElementosComponenteUseCase {
  execute(): Promise<ElementoComponente[]>;
}

export interface GetElementoComponenteByIdUseCase {
  execute(id_elemento: number): Promise<ElementoComponente | null>;
}

export interface GetElementosByComponenteUseCase {
  execute(id_componente: number): Promise<ElementoComponente[]>;
}

export interface UpdateElementoComponenteUseCase {
  execute(dto: UpdateElementoComponenteDTO): Promise<ElementoComponente>;
}

export interface PatchElementoComponenteUseCase {
  execute(
    id_elemento: number,
    dto: PatchElementoComponenteDTO
  ): Promise<ElementoComponente>;
}

export interface DeleteElementoComponenteUseCase {
  execute(id_elemento: number): Promise<void>;
}
