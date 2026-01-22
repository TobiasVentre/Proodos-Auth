"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTipoVariacionByIdService = void 0;
class GetTipoVariacionByIdService {
    constructor(tipoVariacionRepository, logger) {
        this.tipoVariacionRepository = tipoVariacionRepository;
        this.logger = logger;
    }
    async execute(id_tipo_variacion) {
        this.logger.info("[Service] GetTipoVariacionByIdService.execute()", {
            id_tipo_variacion,
        });
        return this.tipoVariacionRepository.getById(id_tipo_variacion);
    }
}
exports.GetTipoVariacionByIdService = GetTipoVariacionByIdService;
