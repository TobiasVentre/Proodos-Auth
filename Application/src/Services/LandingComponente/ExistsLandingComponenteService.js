"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExistsLandingComponenteService = void 0;
class ExistsLandingComponenteService {
    constructor(landingComponenteRepository) {
        this.landingComponenteRepository = landingComponenteRepository;
    }
    async execute(id_landing, id_componente) {
        return await this.landingComponenteRepository.exists(id_landing, id_componente);
    }
}
exports.ExistsLandingComponenteService = ExistsLandingComponenteService;
