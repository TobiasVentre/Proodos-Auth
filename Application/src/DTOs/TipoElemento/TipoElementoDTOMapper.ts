import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { CreateTipoElementoDTO } from "./CreateTipoElementoDTO";
import { UpdateTipoElementoDTO } from "./UpdateTipoElementoDTO";

export const mapCreateTipoElementoDTOToEntity = (
  dto: CreateTipoElementoDTO
): TipoElemento => ({
  id_tipo_elemento: 0,
  nombre: dto.nombre,
});

export const mapUpdateTipoElementoDTOToEntity = (
  dto: UpdateTipoElementoDTO
): TipoElemento => ({
  id_tipo_elemento: dto.id_tipo_elemento,
  nombre: dto.nombre,
});
