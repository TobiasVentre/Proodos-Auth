import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { CreateTipoVariacionDTO } from "./CreateTipoVariacionDTO";
import { UpdateTipoVariacionDTO } from "./UpdateTipoVariacionDTO";

export const mapCreateTipoVariacionDTOToEntity = (
  dto: CreateTipoVariacionDTO
): TipoVariacion => ({
  id_tipo_variacion: 0,
  id_tipo_componente: dto.id_tipo_componente,
  nombre: dto.nombre,
  descripcion: dto.descripcion ?? null,
  css_url: dto.css_url ?? null,
  js_url: dto.js_url ?? null,
  html: dto.html ?? null,
});

export const mapUpdateTipoVariacionDTOToEntity = (
  dto: UpdateTipoVariacionDTO
): TipoVariacion => ({
  id_tipo_variacion: dto.id_tipo_variacion,
  id_tipo_componente: dto.id_tipo_componente,
  nombre: dto.nombre,
  descripcion: dto.descripcion ?? null,
  css_url: dto.css_url ?? null,
  js_url: dto.js_url ?? null,
  html: dto.html ?? null,
});
