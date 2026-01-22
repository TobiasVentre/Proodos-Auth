"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateComponenteService = void 0;
class UpdateComponenteService {
    constructor(componenteRepository) {
        this.componenteRepository = componenteRepository;
    }
    async execute(dto) {
        return await this.componenteRepository.update(dto);
    }
}
exports.UpdateComponenteService = UpdateComponenteService;
