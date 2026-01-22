"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllComponentesService = void 0;
class GetAllComponentesService {
    constructor(componenteRepository) {
        this.componenteRepository = componenteRepository;
    }
    async execute() {
        return await this.componenteRepository.getAll();
    }
}
exports.GetAllComponentesService = GetAllComponentesService;
