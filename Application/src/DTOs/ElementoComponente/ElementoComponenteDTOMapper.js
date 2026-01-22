"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUpdateElementoComponenteDTOToEntity = exports.mapCreateElementoComponenteDTOToEntity = void 0;
const mapCreateElementoComponenteDTOToEntity = (dto) => ({
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
exports.mapCreateElementoComponenteDTOToEntity = mapCreateElementoComponenteDTOToEntity;
const mapUpdateElementoComponenteDTOToEntity = (dto) => ({
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
exports.mapUpdateElementoComponenteDTOToEntity = mapUpdateElementoComponenteDTOToEntity;
