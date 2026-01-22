"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLandingsByComponenteService = void 0;
class GetLandingsByComponenteService {
    constructor(landingComponenteRepository) {
        this.landingComponenteRepository = landingComponenteRepository;
    }
    async execute(id_componente) {
        return await this.landingComponenteRepository.getByComponente(id_componente);
    }
}
exports.GetLandingsByComponenteService = GetLandingsByComponenteService;
