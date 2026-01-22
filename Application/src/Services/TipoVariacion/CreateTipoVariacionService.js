"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTipoVariacionService = void 0;
const TipoVariacionDTOMapper_1 = require("../../DTOs/TipoVariacion/TipoVariacionDTOMapper");
const ensureTipoComponenteExists_1 = require("./ensureTipoComponenteExists");
class CreateTipoVariacionService {
    constructor(tipoVariacionRepository, tipoComponenteRepository, logger) {
        this.tipoVariacionRepository = tipoVariacionRepository;
        this.tipoComponenteRepository = tipoComponenteRepository;
        this.logger = logger;
    }
    async execute(dto) {
        this.logger.info("[Service] CreateTipoVariacionService.execute()");
        await (0, ensureTipoComponenteExists_1.ensureTipoComponenteExists)(this.tipoComponenteRepository, dto.id_tipo_componente);
        const entity = (0, TipoVariacionDTOMapper_1.mapCreateTipoVariacionDTOToEntity)(dto);
        return this.tipoVariacionRepository.create(entity);
    }
}
exports.CreateTipoVariacionService = CreateTipoVariacionService;
