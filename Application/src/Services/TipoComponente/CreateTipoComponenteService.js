"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTipoComponenteService = void 0;
const TipoComponenteDTOMapper_1 = require("../../DTOs/TipoComponente/TipoComponenteDTOMapper");
class CreateTipoComponenteService {
    constructor(tipoComponenteRepository, logger) {
        this.tipoComponenteRepository = tipoComponenteRepository;
        this.logger = logger;
    }
    async execute(dto) {
        this.logger.info("[Service] CreateTipoComponenteService.execute()");
        const entity = (0, TipoComponenteDTOMapper_1.mapCreateTipoComponenteDTOToEntity)(dto);
        return this.tipoComponenteRepository.create(entity);
    }
}
exports.CreateTipoComponenteService = CreateTipoComponenteService;
