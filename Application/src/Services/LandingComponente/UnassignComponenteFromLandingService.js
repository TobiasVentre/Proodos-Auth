"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnassignComponenteFromLandingService = void 0;
class UnassignComponenteFromLandingService {
    constructor(landingComponenteRepository) {
        this.landingComponenteRepository = landingComponenteRepository;
    }
    async execute(id_landing, id_componente) {
        await this.landingComponenteRepository.unassign(id_landing, id_componente);
    }
}
exports.UnassignComponenteFromLandingService = UnassignComponenteFromLandingService;
