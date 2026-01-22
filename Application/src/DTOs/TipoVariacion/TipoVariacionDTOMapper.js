"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUpdateTipoVariacionDTOToEntity = exports.mapCreateTipoVariacionDTOToEntity = void 0;
const mapCreateTipoVariacionDTOToEntity = (dto) => ({
    id_tipo_variacion: 0,
    id_tipo_componente: dto.id_tipo_componente,
    nombre: dto.nombre,
    descripcion: dto.descripcion ?? null,
    css_url: dto.css_url ?? null,
    js_url: dto.js_url ?? null,
    html: dto.html ?? null,
});
exports.mapCreateTipoVariacionDTOToEntity = mapCreateTipoVariacionDTOToEntity;
const mapUpdateTipoVariacionDTOToEntity = (dto) => ({
    id_tipo_variacion: dto.id_tipo_variacion,
    id_tipo_componente: dto.id_tipo_componente,
    nombre: dto.nombre,
    descripcion: dto.descripcion ?? null,
    css_url: dto.css_url ?? null,
    js_url: dto.js_url ?? null,
    html: dto.html ?? null,
});
exports.mapUpdateTipoVariacionDTOToEntity = mapUpdateTipoVariacionDTOToEntity;
