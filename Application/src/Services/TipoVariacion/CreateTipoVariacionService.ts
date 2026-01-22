import { CreateTipoVariacionDTO } from "../../DTOs/TipoVariacion/CreateTipoVariacionDTO";
import { mapCreateTipoVariacionDTOToEntity } from "../../DTOs/TipoVariacion/TipoVariacionDTOMapper";
import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { CreateTipoVariacionUseCase } from "../../Ports/TipoVariacionUseCases";
import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { ensureTipoComponenteExists } from "./ensureTipoComponenteExists";
import { ILogger } from "../../Interfaces/ILogger";

export class CreateTipoVariacionService implements CreateTipoVariacionUseCase {
  constructor(
    private readonly tipoVariacionRepository: ITipoVariacionRepository,
    private readonly tipoComponenteRepository: ITipoComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: CreateTipoVariacionDTO): Promise<TipoVariacion> {
    this.logger.info("[Service] CreateTipoVariacionService.execute()");
    await ensureTipoComponenteExists(
      this.tipoComponenteRepository,
      dto.id_tipo_componente
    );
    const entity = mapCreateTipoVariacionDTOToEntity(dto);
    return this.tipoVariacionRepository.create(entity);
  }
}
