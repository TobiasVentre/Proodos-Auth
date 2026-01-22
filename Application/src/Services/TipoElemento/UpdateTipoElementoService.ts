import { UpdateTipoElementoDTO } from "../../DTOs/TipoElemento/UpdateTipoElementoDTO";
import { mapUpdateTipoElementoDTOToEntity } from "../../DTOs/TipoElemento/TipoElementoDTOMapper";
import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { UpdateTipoElementoUseCase } from "../../Ports/TipoElementoUseCases";
import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";

export class UpdateTipoElementoService implements UpdateTipoElementoUseCase {
  constructor(private readonly tipoElementoRepository: ITipoElementoRepository) {}

  async execute(dto: UpdateTipoElementoDTO): Promise<TipoElemento> {
    const entity = mapUpdateTipoElementoDTOToEntity(dto);
    return this.tipoElementoRepository.update(entity);
  }
}
