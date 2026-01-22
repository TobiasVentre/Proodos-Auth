"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignLandingComponenteService = void 0;
class AssignLandingComponenteService {
    constructor(landingPageRepository, componenteRepository, landingComponenteRepository, logger) {
        this.landingPageRepository = landingPageRepository;
        this.componenteRepository = componenteRepository;
        this.landingComponenteRepository = landingComponenteRepository;
        this.logger = logger;
    }
    async execute(id_landing, id_componente) {
        this.logger.info("[Service] AssignLandingComponenteService.execute()", { id_landing, id_componente });
        const landing = await this.landingPageRepository.getById(id_landing);
        if (!landing)
            throw new Error("LANDING_NOT_FOUND");
        const componente = await this.componenteRepository.getById(id_componente);
        if (!componente)
            throw new Error("COMPONENTE_NOT_FOUND");
        const already = await this.landingComponenteRepository.exists(id_landing, id_componente);
        if (already) {
            return { created: false, data: { id_landing, id_componente } };
        }
        const createdRow = await this.landingComponenteRepository.assign({ id_landing, id_componente });
        return { created: true, data: createdRow };
    }
}
exports.AssignLandingComponenteService = AssignLandingComponenteService;
