import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { GetTipoComponenteByIdUseCase } from "../../Ports/TipoComponenteUseCases";
import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { ILogger } from "../../Interfaces/ILogger";

export class GetTipoComponenteByIdService implements GetTipoComponenteByIdUseCase {
  constructor(
    private readonly tipoComponenteRepository: ITipoComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_tipo_componente: number): Promise<TipoComponente | null> {
    this.logger.info("[Service] GetTipoComponenteByIdService.execute()", {
      id_tipo_componente,
    });
    return this.tipoComponenteRepository.getById(id_tipo_componente);
  }
}
