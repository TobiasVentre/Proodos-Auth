"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanMapper = void 0;
class PlanMapper {
    static toDomain(model) {
        return {
            id_plan: model.id_plan,
            nombre: model.nombre,
            capacidad: Number(model.capacidad),
            capacidad_anterior: Number(model.capacidad_anterior),
            precio_full_price: Number(model.precio_full_price),
            precio_oferta: Number(model.precio_oferta),
            aumento: Number(model.aumento),
            precio_sin_iva: Number(model.precio_sin_iva),
        };
    }
}
exports.PlanMapper = PlanMapper;
