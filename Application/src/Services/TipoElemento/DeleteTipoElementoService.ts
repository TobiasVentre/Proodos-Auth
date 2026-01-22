import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { DeleteTipoElementoUseCase } from "../../Ports/TipoElementoUseCases";

export class DeleteTipoElementoService implements DeleteTipoElementoUseCase {
  constructor(private readonly tipoElementoRepository: ITipoElementoRepository) {}

  async execute(id_tipo_elemento: number): Promise<void> {
    await this.tipoElementoRepository.delete(id_tipo_elemento);
  }
}
