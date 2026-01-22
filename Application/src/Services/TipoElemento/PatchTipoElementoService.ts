import { ITipoElementoRepository } from "../../Interfaces/ITipoElementoRepository";
import { PatchTipoElementoUseCase } from "../../Ports/TipoElementoUseCases";
import { PatchTipoElementoDTO } from "../../DTOs/TipoElemento/PatchTipoElementoDTO";
import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";

export class PatchTipoElementoService implements PatchTipoElementoUseCase {
  constructor(private readonly tipoElementoRepository: ITipoElementoRepository) {}

  async execute(
    id_tipo_elemento: number,
    dto: PatchTipoElementoDTO
  ): Promise<TipoElemento> {
    return this.tipoElementoRepository.patch(id_tipo_elemento, dto);
  }
}
