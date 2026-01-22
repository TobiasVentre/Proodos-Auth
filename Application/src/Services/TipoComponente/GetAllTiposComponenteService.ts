import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { GetAllTiposComponenteUseCase } from "../../Ports/TipoComponenteUseCases";
import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { ILogger } from "../../Interfaces/ILogger";

export class GetAllTiposComponenteService implements GetAllTiposComponenteUseCase {
  constructor(
    private readonly tipoComponenteRepository: ITipoComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(): Promise<TipoComponente[]> {
    this.logger.info("[Service] GetAllTiposComponenteService.execute()");
    return this.tipoComponenteRepository.getAll();
  }
}
