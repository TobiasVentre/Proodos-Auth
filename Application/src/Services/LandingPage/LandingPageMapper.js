"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPageMapper = void 0;
const LandingPage_1 = require("@proodos/domain/Entities/LandingPage");
const ensureNonEmptyString = (field, value) => {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`${field} must be a non-empty string`);
    }
    return value.trim();
};
const ensurePositiveInteger = (field, value) => {
    if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
        throw new Error(`${field} must be a positive integer`);
    }
    return value;
};
exports.LandingPageMapper = {
    fromCreateCommand(dto) {
        const landing = new LandingPage_1.LandingPage();
        landing.URL = ensureNonEmptyString("URL", dto.URL);
        landing.estado = ensureNonEmptyString("estado", dto.estado);
        landing.segmento = ensureNonEmptyString("segmento", dto.segmento);
        return landing;
    },
    fromUpdateCommand(dto) {
        const landing = new LandingPage_1.LandingPage();
        landing.id_landing = ensurePositiveInteger("id_landing", dto.id_landing);
        landing.URL = ensureNonEmptyString("URL", dto.URL);
        landing.estado = ensureNonEmptyString("estado", dto.estado);
        landing.segmento = ensureNonEmptyString("segmento", dto.segmento);
        return landing;
    },
};
