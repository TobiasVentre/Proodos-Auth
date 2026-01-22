import { UpdateTipoVariacionDTO } from "../../DTOs/TipoVariacion/UpdateTipoVariacionDTO";
import { mapUpdateTipoVariacionDTOToEntity } from "../../DTOs/TipoVariacion/TipoVariacionDTOMapper";
import { ITipoVariacionRepository } from "../../Interfaces/ITipoVariacionRepository";
import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";
import { UpdateTipoVariacionUseCase } from "../../Ports/TipoVariacionUseCases";
import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { ensureTipoComponenteExists } from "./ensureTipoComponenteExists";

export class UpdateTipoVariacionService implements UpdateTipoVariacionUseCase {
  constructor(
    private readonly tipoVariacionRepository: ITipoVariacionRepository,
    private readonly tipoComponenteRepository: ITipoComponenteRepository
  ) {}

  async execute(dto: UpdateTipoVariacionDTO): Promise<TipoVariacion> {
    await ensureTipoComponenteExists(
      this.tipoComponenteRepository,
      dto.id_tipo_componente
    );
    const entity = mapUpdateTipoVariacionDTOToEntity(dto);
    return this.tipoVariacionRepository.update(entity);
  }
}
