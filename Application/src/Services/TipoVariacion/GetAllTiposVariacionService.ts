import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { GetAllTiposVariacionUseCase } from "../../Ports/TipoVariacionUseCases";
import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { ILogger } from "../../Interfaces/ILogger";

export class GetAllTiposVariacionService implements GetAllTiposVariacionUseCase {
  constructor(
    private readonly tipoVariacionRepository: ITipoVariacionRepository,
    private readonly logger: ILogger
  ) {}

  async execute(): Promise<TipoVariacion[]> {
    this.logger.info("[Service] GetAllTiposVariacionService.execute()");
    return this.tipoVariacionRepository.getAll();
  }
}
