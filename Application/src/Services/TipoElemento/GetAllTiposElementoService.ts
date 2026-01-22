import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { GetAllTiposElementoUseCase } from "../../Ports/TipoElementoUseCases";
import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { ILogger } from "../../Interfaces/ILogger";

export class GetAllTiposElementoService implements GetAllTiposElementoUseCase {
  constructor(
    private readonly tipoElementoRepository: ITipoElementoRepository,
    private readonly logger: ILogger
  ) {}

  async execute(): Promise<TipoElemento[]> {
    this.logger.info("[Service] GetAllTiposElementoService.execute()");
    return this.tipoElementoRepository.getAll();
  }
}
