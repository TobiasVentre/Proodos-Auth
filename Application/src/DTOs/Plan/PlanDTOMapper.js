"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUpdatePlanDTOToEntity = exports.mapCreatePlanDTOToEntity = void 0;
const mapCreatePlanDTOToEntity = (dto) => ({
    nombre: dto.nombre,
    capacidad: dto.capacidad,
    capacidad_anterior: dto.capacidad_anterior,
    precio_full_price: dto.precio_full_price,
    precio_oferta: dto.precio_oferta,
    aumento: dto.aumento,
    precio_sin_iva: dto.precio_sin_iva,
    id_plan: 0,
});
exports.mapCreatePlanDTOToEntity = mapCreatePlanDTOToEntity;
const mapUpdatePlanDTOToEntity = (dto) => ({
    id_plan: dto.id_plan,
    nombre: dto.nombre,
    capacidad: dto.capacidad,
    capacidad_anterior: dto.capacidad_anterior,
    precio_full_price: dto.precio_full_price,
    precio_oferta: dto.precio_oferta,
    aumento: dto.aumento,
    precio_sin_iva: dto.precio_sin_iva,
});
exports.mapUpdatePlanDTOToEntity = mapUpdatePlanDTOToEntity;
