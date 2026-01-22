"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponenteMapper = void 0;
const PlanMapper_1 = require("./PlanMapper");
class ComponenteMapper {
    static toDomain(model) {
        const plan = model.plan;
        return {
            id_componente: model.id_componente,
            id_tipo_componente: model.id_tipo_componente,
            id_plan: model.id_plan,
            id_tipo_variacion: model.id_tipo_variacion,
            nombre: model.nombre,
            fecha_creacion: model.fecha_creacion,
            estado: model.estado,
            fecha_baja: model.fecha_baja,
            plan: plan ? PlanMapper_1.PlanMapper.toDomain(plan) : undefined,
        };
    }
}
exports.ComponenteMapper = ComponenteMapper;
