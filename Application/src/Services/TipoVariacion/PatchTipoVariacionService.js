"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchTipoVariacionService = void 0;
const ensureTipoComponenteExists_1 = require("./ensureTipoComponenteExists");
class PatchTipoVariacionService {
    constructor(tipoVariacionRepository, tipoComponenteRepository) {
        this.tipoVariacionRepository = tipoVariacionRepository;
        this.tipoComponenteRepository = tipoComponenteRepository;
    }
    async execute(id_tipo_variacion, dto) {
        if (dto.id_tipo_componente !== undefined) {
            await (0, ensureTipoComponenteExists_1.ensureTipoComponenteExists)(this.tipoComponenteRepository, dto.id_tipo_componente);
        }
        return this.tipoVariacionRepository.patch(id_tipo_variacion, dto);
    }
}
exports.PatchTipoVariacionService = PatchTipoVariacionService;
