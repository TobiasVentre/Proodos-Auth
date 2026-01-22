"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTipoComponenteService = void 0;
const TipoComponenteDTOMapper_1 = require("../../DTOs/TipoComponente/TipoComponenteDTOMapper");
class UpdateTipoComponenteService {
    constructor(tipoComponenteRepository) {
        this.tipoComponenteRepository = tipoComponenteRepository;
    }
    async execute(dto) {
        const entity = (0, TipoComponenteDTOMapper_1.mapUpdateTipoComponenteDTOToEntity)(dto);
        return this.tipoComponenteRepository.update(entity);
    }
}
exports.UpdateTipoComponenteService = UpdateTipoComponenteService;
