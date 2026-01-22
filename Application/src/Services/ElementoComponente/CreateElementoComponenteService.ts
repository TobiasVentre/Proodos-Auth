import { CreateElementoComponenteDTO } from "../../DTOs/ElementoComponente/CreateElementoComponenteDTO";
import { mapCreateElementoComponenteDTOToEntity } from "../../DTOs/ElementoComponente/ElementoComponenteDTOMapper";
import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { CreateElementoComponenteUseCase } from "../../Ports/ElementoComponenteUseCases";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ILogger } from "../../Interfaces/ILogger";

export class CreateElementoComponenteService implements CreateElementoComponenteUseCase {
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly componenteRepository: IComponenteRepository,
    private readonly tipoElementoRepository: ITipoElementoRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: CreateElementoComponenteDTO): Promise<ElementoComponente> {
    this.logger.info("[Service] CreateElementoComponenteService.execute()");

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

    const entity = mapCreateElementoComponenteDTOToEntity(dto);
    return this.elementoComponenteRepository.create(entity);
  }
}
