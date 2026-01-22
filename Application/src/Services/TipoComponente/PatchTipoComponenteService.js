"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchTipoComponenteService = void 0;
class PatchTipoComponenteService {
    constructor(tipoComponenteRepository) {
        this.tipoComponenteRepository = tipoComponenteRepository;
    }
    async execute(id_tipo_componente, dto) {
        return this.tipoComponenteRepository.patch(id_tipo_componente, dto);
    }
}
exports.PatchTipoComponenteService = PatchTipoComponenteService;
