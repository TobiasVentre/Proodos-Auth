"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTipoVariacionService = void 0;
const TipoVariacionDTOMapper_1 = require("../../DTOs/TipoVariacion/TipoVariacionDTOMapper");
const ensureTipoComponenteExists_1 = require("./ensureTipoComponenteExists");
class UpdateTipoVariacionService {
    constructor(tipoVariacionRepository, tipoComponenteRepository) {
        this.tipoVariacionRepository = tipoVariacionRepository;
        this.tipoComponenteRepository = tipoComponenteRepository;
    }
    async execute(dto) {
        await (0, ensureTipoComponenteExists_1.ensureTipoComponenteExists)(this.tipoComponenteRepository, dto.id_tipo_componente);
        const entity = (0, TipoVariacionDTOMapper_1.mapUpdateTipoVariacionDTOToEntity)(dto);
        return this.tipoVariacionRepository.update(entity);
    }
}
exports.UpdateTipoVariacionService = UpdateTipoVariacionService;
