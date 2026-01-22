import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { GetTipoElementoByIdUseCase } from "../../Ports/TipoElementoUseCases";
import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { ILogger } from "../../Interfaces/ILogger";

export class GetTipoElementoByIdService implements GetTipoElementoByIdUseCase {
  constructor(
    private readonly tipoElementoRepository: ITipoElementoRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_tipo_elemento: number): Promise<TipoElemento | null> {
    this.logger.info("[Service] GetTipoElementoByIdService.execute()", {
      id_tipo_elemento,
    });
    return this.tipoElementoRepository.getById(id_tipo_elemento);
  }
}
