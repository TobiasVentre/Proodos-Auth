"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoVariacionMapper = void 0;
class TipoVariacionMapper {
    static toDomain(model) {
        return {
            id_tipo_variacion: model.id_tipo_variacion,
            id_tipo_componente: model.id_tipo_componente,
            nombre: model.nombre,
            descripcion: model.descripcion,
            css_url: model.css_url,
            js_url: model.js_url,
            html: model.html,
        };
    }
}
exports.TipoVariacionMapper = TipoVariacionMapper;
