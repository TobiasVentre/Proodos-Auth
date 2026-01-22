import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { CreateElementoComponenteDTO } from "./CreateElementoComponenteDTO";
import { UpdateElementoComponenteDTO } from "./UpdateElementoComponenteDTO";

export const mapCreateElementoComponenteDTOToEntity = (
  dto: CreateElementoComponenteDTO
): ElementoComponente => ({
  id_elemento: 0,
  id_componente: dto.id_componente,
  id_tipo_elemento: dto.id_tipo_elemento,
  nombre: dto.nombre,
  icono_img: dto.icono_img,
  descripcion: dto.descripcion,
  link: dto.link,
  orden: dto.orden,
  css_url: dto.css_url,
});

export const mapUpdateElementoComponenteDTOToEntity = (
  dto: UpdateElementoComponenteDTO
): ElementoComponente => ({
  id_elemento: dto.id_elemento,
  id_componente: dto.id_componente,
  id_tipo_elemento: dto.id_tipo_elemento,
  nombre: dto.nombre,
  icono_img: dto.icono_img,
  descripcion: dto.descripcion,
  link: dto.link,
  orden: dto.orden,
  css_url: dto.css_url,
});
