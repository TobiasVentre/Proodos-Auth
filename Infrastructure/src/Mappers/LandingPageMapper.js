"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPageMapper = void 0;
class LandingPageMapper {
    static toDomain(model) {
        return {
            id_landing: model.id_landing,
            URL: model.URL,
            estado: model.estado,
            segmento: model.segmento,
        };
    }
}
exports.LandingPageMapper = LandingPageMapper;
