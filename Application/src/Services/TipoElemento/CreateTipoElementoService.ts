import { CreateTipoElementoDTO } from "../../DTOs/TipoElemento/CreateTipoElementoDTO";
import { mapCreateTipoElementoDTOToEntity } from "../../DTOs/TipoElemento/TipoElementoDTOMapper";
import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { CreateTipoElementoUseCase } from "../../Ports/TipoElementoUseCases";
import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { ILogger } from "../../Interfaces/ILogger";

export class CreateTipoElementoService implements CreateTipoElementoUseCase {
  constructor(
    private readonly tipoElementoRepository: ITipoElementoRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: CreateTipoElementoDTO): Promise<TipoElemento> {
    this.logger.info("[Service] CreateTipoElementoService.execute()");
    const entity = mapCreateTipoElementoDTOToEntity(dto);
    return this.tipoElementoRepository.create(entity);
  }
}
