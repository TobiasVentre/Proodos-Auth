"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteComponenteService = void 0;
class DeleteComponenteService {
    constructor(componenteRepository, landingComponenteRepository) {
        this.componenteRepository = componenteRepository;
        this.landingComponenteRepository = landingComponenteRepository;
    }
    async execute(id_componente) {
        const componente = await this.componenteRepository.getById(id_componente);
        if (!componente) {
            throw new Error("COMPONENTE_NOT_FOUND");
        }
        const isAssigned = await this.landingComponenteRepository.existsByComponente(id_componente);
        if (isAssigned) {
            throw new Error("COMPONENTE_ASSIGNED");
        }
        await this.componenteRepository.delete(id_componente);
    }
}
exports.DeleteComponenteService = DeleteComponenteService;
