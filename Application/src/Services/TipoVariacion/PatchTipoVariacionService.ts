import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { PatchTipoVariacionUseCase } from "../../Ports/TipoVariacionUseCases";
import { PatchTipoVariacionDTO } from "../../DTOs/TipoVariacion/PatchTipoVariacionDTO";
import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { ensureTipoComponenteExists } from "./ensureTipoComponenteExists";

export class PatchTipoVariacionService implements PatchTipoVariacionUseCase {
  constructor(
    private readonly tipoVariacionRepository: ITipoVariacionRepository,
    private readonly tipoComponenteRepository: ITipoComponenteRepository
  ) {}

  async execute(
    id_tipo_variacion: number,
    dto: PatchTipoVariacionDTO
  ): Promise<TipoVariacion> {
    if (dto.id_tipo_componente !== undefined) {
      await ensureTipoComponenteExists(
        this.tipoComponenteRepository,
        dto.id_tipo_componente
      );
    }
    return this.tipoVariacionRepository.patch(id_tipo_variacion, dto);
  }
}
