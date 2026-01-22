import { UpdateElementoComponenteDTO } from "../../DTOs/ElementoComponente/UpdateElementoComponenteDTO";
import { mapUpdateElementoComponenteDTOToEntity } from "../../DTOs/ElementoComponente/ElementoComponenteDTOMapper";
import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { UpdateElementoComponenteUseCase } from "../../Ports/ElementoComponenteUseCases";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";

export class UpdateElementoComponenteService implements UpdateElementoComponenteUseCase {
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly componenteRepository: IComponenteRepository,
    private readonly tipoElementoRepository: ITipoElementoRepository
  ) {}

  async execute(dto: UpdateElementoComponenteDTO): Promise<ElementoComponente> {
    const componente = await this.componenteRepository.getById(dto.id_componente);
    if (!componente) {
      throw new Error("COMPONENTE_NOT_FOUND");
    }

    const tipoElementoExists = await this.tipoElementoRepository.exists(
      dto.id_tipo_elemento
    );
    if (!tipoElementoExists) {
      throw new Error("TIPO_ELEMENTO_NOT_FOUND");
    }

    const entity = mapUpdateElementoComponenteDTOToEntity(dto);
    return this.elementoComponenteRepository.update(entity);
  }
}
