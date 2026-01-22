"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteElementoComponenteService = void 0;
class DeleteElementoComponenteService {
    constructor(elementoComponenteRepository) {
        this.elementoComponenteRepository = elementoComponenteRepository;
    }
    async execute(id_elemento) {
        await this.elementoComponenteRepository.delete(id_elemento);
    }
}
exports.DeleteElementoComponenteService = DeleteElementoComponenteService;
