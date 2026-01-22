import { UpdateTipoComponenteDTO } from "../../DTOs/TipoComponente/UpdateTipoComponenteDTO";
import { mapUpdateTipoComponenteDTOToEntity } from "../../DTOs/TipoComponente/TipoComponenteDTOMapper";
import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { UpdateTipoComponenteUseCase } from "../../Ports/TipoComponenteUseCases";
import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";

export class UpdateTipoComponenteService implements UpdateTipoComponenteUseCase {
  constructor(private readonly tipoComponenteRepository: ITipoComponenteRepository) {}

  async execute(dto: UpdateTipoComponenteDTO): Promise<TipoComponente> {
    const entity = mapUpdateTipoComponenteDTOToEntity(dto);
    return this.tipoComponenteRepository.update(entity);
  }
}
