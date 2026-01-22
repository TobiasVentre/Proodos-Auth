"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoComponenteMapper = void 0;
class TipoComponenteMapper {
    static toDomain(model) {
        return {
            id_tipo_componente: model.id_tipo_componente,
            nombre: model.nombre,
            estado: model.estado,
        };
    }
}
exports.TipoComponenteMapper = TipoComponenteMapper;
