import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { GetTipoVariacionByIdUseCase } from "../../Ports/TipoVariacionUseCases";
import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { ILogger } from "../../Interfaces/ILogger";

export class GetTipoVariacionByIdService implements GetTipoVariacionByIdUseCase {
  constructor(
    private readonly tipoVariacionRepository: ITipoVariacionRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_tipo_variacion: number): Promise<TipoVariacion | null> {
    this.logger.info("[Service] GetTipoVariacionByIdService.execute()", {
      id_tipo_variacion,
    });
    return this.tipoVariacionRepository.getById(id_tipo_variacion);
  }
}
