"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoElementoMapper = void 0;
class TipoElementoMapper {
    static toDomain(model) {
        return {
            id_tipo_elemento: model.id_tipo_elemento,
            nombre: model.nombre,
        };
    }
}
exports.TipoElementoMapper = TipoElementoMapper;
