import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { GetElementosByComponenteUseCase } from "../../Ports/ElementoComponenteUseCases";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { ILogger } from "../../Interfaces/ILogger";

export class GetElementosByComponenteService
  implements GetElementosByComponenteUseCase
{
  constructor(
    private readonly elementoComponenteRepository: IElementoComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_componente: number): Promise<ElementoComponente[]> {
    this.logger.info("[Service] GetElementosByComponenteService.execute()", {
      id_componente,
    });
    return this.elementoComponenteRepository.getByComponente(id_componente);
  }
}
