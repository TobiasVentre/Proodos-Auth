"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUpdateTipoElementoDTOToEntity = exports.mapCreateTipoElementoDTOToEntity = void 0;
const mapCreateTipoElementoDTOToEntity = (dto) => ({
    id_tipo_elemento: 0,
    nombre: dto.nombre,
});
exports.mapCreateTipoElementoDTOToEntity = mapCreateTipoElementoDTOToEntity;
const mapUpdateTipoElementoDTOToEntity = (dto) => ({
    id_tipo_elemento: dto.id_tipo_elemento,
    nombre: dto.nombre,
});
exports.mapUpdateTipoElementoDTOToEntity = mapUpdateTipoElementoDTOToEntity;
