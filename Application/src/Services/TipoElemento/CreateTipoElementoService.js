"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTipoElementoService = void 0;
const TipoElementoDTOMapper_1 = require("../../DTOs/TipoElemento/TipoElementoDTOMapper");
class CreateTipoElementoService {
    constructor(tipoElementoRepository, logger) {
        this.tipoElementoRepository = tipoElementoRepository;
        this.logger = logger;
    }
    async execute(dto) {
        this.logger.info("[Service] CreateTipoElementoService.execute()");
        const entity = (0, TipoElementoDTOMapper_1.mapCreateTipoElementoDTOToEntity)(dto);
        return this.tipoElementoRepository.create(entity);
    }
}
exports.CreateTipoElementoService = CreateTipoElementoService;
