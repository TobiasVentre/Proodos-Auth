import { IElementoComponenteRepository } from "../../Interfaces/IElementoComponenteRepository";
import { DeleteElementoComponenteUseCase } from "../../Ports/ElementoComponenteUseCases";

export class DeleteElementoComponenteService implements DeleteElementoComponenteUseCase {
  constructor(private readonly elementoComponenteRepository: IElementoComponenteRepository) {}

  async execute(id_elemento: number): Promise<void> {
    await this.elementoComponenteRepository.delete(id_elemento);
  }
}
