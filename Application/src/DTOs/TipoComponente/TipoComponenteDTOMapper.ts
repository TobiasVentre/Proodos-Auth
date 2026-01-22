import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { CreateTipoComponenteDTO } from "./CreateTipoComponenteDTO";
import { UpdateTipoComponenteDTO } from "./UpdateTipoComponenteDTO";

export const mapCreateTipoComponenteDTOToEntity = (
  dto: CreateTipoComponenteDTO
): TipoComponente => ({
  id_tipo_componente: 0,
  nombre: dto.nombre,
  estado: dto.estado,
});

export const mapUpdateTipoComponenteDTOToEntity = (
  dto: UpdateTipoComponenteDTO
): TipoComponente => ({
  id_tipo_componente: dto.id_tipo_componente,
  nombre: dto.nombre,
  estado: dto.estado,
});
