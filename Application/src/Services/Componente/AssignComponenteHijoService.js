"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignComponenteHijoService = void 0;
class AssignComponenteHijoService {
    constructor(componenteRepository, compuestoRepository) {
        this.componenteRepository = componenteRepository;
        this.compuestoRepository = compuestoRepository;
    }
    async execute(id_padre, id_hijo) {
        const padre = await this.componenteRepository.getById(id_padre);
        if (!padre) {
            throw new Error("COMPONENTE_PADRE_NOT_FOUND");
        }
        const hijo = await this.componenteRepository.getById(id_hijo);
        if (!hijo) {
            throw new Error("COMPONENTE_HIJO_NOT_FOUND");
        }
        return this.compuestoRepository.assign(id_padre, id_hijo);
    }
}
exports.AssignComponenteHijoService = AssignComponenteHijoService;
