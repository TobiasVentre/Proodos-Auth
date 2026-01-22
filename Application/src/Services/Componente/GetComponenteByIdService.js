"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetComponenteByIdService = void 0;
class GetComponenteByIdService {
    constructor(componenteRepository) {
        this.componenteRepository = componenteRepository;
    }
    async execute(id_componente) {
        return await this.componenteRepository.getById(id_componente);
    }
}
exports.GetComponenteByIdService = GetComponenteByIdService;
