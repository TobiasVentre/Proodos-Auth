"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUpdateTipoComponenteDTOToEntity = exports.mapCreateTipoComponenteDTOToEntity = void 0;
const mapCreateTipoComponenteDTOToEntity = (dto) => ({
    id_tipo_componente: 0,
    nombre: dto.nombre,
    estado: dto.estado,
});
exports.mapCreateTipoComponenteDTOToEntity = mapCreateTipoComponenteDTOToEntity;
const mapUpdateTipoComponenteDTOToEntity = (dto) => ({
    id_tipo_componente: dto.id_tipo_componente,
    nombre: dto.nombre,
    estado: dto.estado,
});
exports.mapUpdateTipoComponenteDTOToEntity = mapUpdateTipoComponenteDTOToEntity;
