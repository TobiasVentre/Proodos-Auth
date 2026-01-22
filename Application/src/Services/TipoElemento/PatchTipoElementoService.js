"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchTipoElementoService = void 0;
class PatchTipoElementoService {
    constructor(tipoElementoRepository) {
        this.tipoElementoRepository = tipoElementoRepository;
    }
    async execute(id_tipo_elemento, dto) {
        return this.tipoElementoRepository.patch(id_tipo_elemento, dto);
    }
}
exports.PatchTipoElementoService = PatchTipoElementoService;
