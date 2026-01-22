import { CreateTipoComponenteDTO } from "../../DTOs/TipoComponente/CreateTipoComponenteDTO";
import { mapCreateTipoComponenteDTOToEntity } from "../../DTOs/TipoComponente/TipoComponenteDTOMapper";
import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { CreateTipoComponenteUseCase } from "../../Ports/TipoComponenteUseCases";
import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { ILogger } from "../../Interfaces/ILogger";

export class CreateTipoComponenteService implements CreateTipoComponenteUseCase {
  constructor(
    private readonly tipoComponenteRepository: ITipoComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: CreateTipoComponenteDTO): Promise<TipoComponente> {
    this.logger.info("[Service] CreateTipoComponenteService.execute()");
    const entity = mapCreateTipoComponenteDTOToEntity(dto);
    return this.tipoComponenteRepository.create(entity);
  }
}
