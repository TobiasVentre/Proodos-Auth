"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingComponenteMapper = void 0;
const ComponenteMapper_1 = require("./ComponenteMapper");
const LandingPageMapper_1 = require("./LandingPageMapper");
class LandingComponenteMapper {
    static toDomain(model) {
        const landing = model.landing;
        const componente = model.componente;
        return {
            id_landing: model.id_landing,
            id_componente: model.id_componente,
            landing: landing ? LandingPageMapper_1.LandingPageMapper.toDomain(landing) : undefined,
            componente: componente ? ComponenteMapper_1.ComponenteMapper.toDomain(componente) : undefined,
        };
    }
    static toPersistence(entity) {
        return {
            id_landing: entity.id_landing,
            id_componente: entity.id_componente,
        };
    }
}
exports.LandingComponenteMapper = LandingComponenteMapper;
