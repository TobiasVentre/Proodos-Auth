import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { PatchTipoComponenteUseCase } from "../../Ports/TipoComponenteUseCases";
import { PatchTipoComponenteDTO } from "../../DTOs/TipoComponente/PatchTipoComponenteDTO";
import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";

export class PatchTipoComponenteService implements PatchTipoComponenteUseCase {
  constructor(private readonly tipoComponenteRepository: ITipoComponenteRepository) {}

  async execute(
    id_tipo_componente: number,
    dto: PatchTipoComponenteDTO
  ): Promise<TipoComponente> {
    return this.tipoComponenteRepository.patch(id_tipo_componente, dto);
  }
}
