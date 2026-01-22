"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchLandingPageService = void 0;
const ensureNonEmptyString = (field, value) => {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`${field} must be a non-empty string`);
    }
    return value.trim();
};
class PatchLandingPageService {
    constructor(landingPageRepository) {
        this.landingPageRepository = landingPageRepository;
    }
    async execute(id_landing, dto) {
        const existing = await this.landingPageRepository.getById(id_landing);
        if (!existing) {
            throw new Error("LANDING_NOT_FOUND");
        }
        if (Object.keys(dto).length === 0) {
            throw new Error("No fields provided for patch");
        }
        const updated = {
            ...existing,
            URL: dto.URL !== undefined ? ensureNonEmptyString("URL", dto.URL) : existing.URL,
            estado: dto.estado !== undefined ? ensureNonEmptyString("estado", dto.estado) : existing.estado,
            segmento: dto.segmento !== undefined ? ensureNonEmptyString("segmento", dto.segmento) : existing.segmento,
        };
        return this.landingPageRepository.update(updated);
    }
}
exports.PatchLandingPageService = PatchLandingPageService;
