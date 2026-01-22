"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTipoElementoService = void 0;
class DeleteTipoElementoService {
    constructor(tipoElementoRepository) {
        this.tipoElementoRepository = tipoElementoRepository;
    }
    async execute(id_tipo_elemento) {
        await this.tipoElementoRepository.delete(id_tipo_elemento);
    }
}
exports.DeleteTipoElementoService = DeleteTipoElementoService;
