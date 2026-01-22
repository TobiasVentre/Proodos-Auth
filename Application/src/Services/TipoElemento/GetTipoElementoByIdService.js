"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTipoElementoByIdService = void 0;
class GetTipoElementoByIdService {
    constructor(tipoElementoRepository, logger) {
        this.tipoElementoRepository = tipoElementoRepository;
        this.logger = logger;
    }
    async execute(id_tipo_elemento) {
        this.logger.info("[Service] GetTipoElementoByIdService.execute()", {
            id_tipo_elemento,
        });
        return this.tipoElementoRepository.getById(id_tipo_elemento);
    }
}
exports.GetTipoElementoByIdService = GetTipoElementoByIdService;
