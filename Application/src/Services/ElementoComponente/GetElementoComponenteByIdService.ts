import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { GetElementoComponenteByIdUseCase } from "../../Ports/ElementoComponenteUseCases";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ILogger } from "../../Interfaces/ILogger";

export class GetElementoComponenteByIdService
  implements GetElementoComponenteByIdUseCase
{
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_elemento: number): Promise<ElementoComponente | null> {
    this.logger.info("[Service] GetElementoComponenteByIdService.execute()", {
      id_elemento,
    });
    return this.elementoComponenteRepository.getById(id_elemento);
  }
}
