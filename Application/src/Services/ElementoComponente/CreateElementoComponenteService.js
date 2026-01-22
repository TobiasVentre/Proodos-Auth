"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateElementoComponenteService = void 0;
const ElementoComponenteDTOMapper_1 = require("../../DTOs/ElementoComponente/ElementoComponenteDTOMapper");
class CreateElementoComponenteService {
    constructor(elementoComponenteRepository, componenteRepository, tipoElementoRepository, logger) {
        this.elementoComponenteRepository = elementoComponenteRepository;
        this.componenteRepository = componenteRepository;
        this.tipoElementoRepository = tipoElementoRepository;
        this.logger = logger;
    }
    async execute(dto) {
        this.logger.info("[Service] CreateElementoComponenteService.execute()");
        const componente = await this.componenteRepository.getById(dto.id_componente);
        if (!componente) {
            throw new Error("COMPONENTE_NOT_FOUND");
        }
        const tipoElementoExists = await this.tipoElementoRepository.exists(dto.id_tipo_elemento);
        if (!tipoElementoExists) {
            throw new Error("TIPO_ELEMENTO_NOT_FOUND");
        }
        const entity = (0, ElementoComponenteDTOMapper_1.mapCreateElementoComponenteDTOToEntity)(dto);
        return this.elementoComponenteRepository.create(entity);
    }
}
exports.CreateElementoComponenteService = CreateElementoComponenteService;
