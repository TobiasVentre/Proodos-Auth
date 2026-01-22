"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLandingComponentesService = void 0;
class GetLandingComponentesService {
    constructor(landingComponenteRepository) {
        this.landingComponenteRepository = landingComponenteRepository;
    }
    async execute(id_landing) {
        return await this.landingComponenteRepository.getByLanding(id_landing);
    }
}
exports.GetLandingComponentesService = GetLandingComponentesService;
