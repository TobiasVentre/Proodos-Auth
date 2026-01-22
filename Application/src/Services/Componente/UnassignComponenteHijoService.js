"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnassignComponenteHijoService = void 0;
class UnassignComponenteHijoService {
    constructor(compuestoRepository) {
        this.compuestoRepository = compuestoRepository;
    }
    async execute(id_padre, id_hijo) {
        await this.compuestoRepository.unassign(id_padre, id_hijo);
    }
}
exports.UnassignComponenteHijoService = UnassignComponenteHijoService;
