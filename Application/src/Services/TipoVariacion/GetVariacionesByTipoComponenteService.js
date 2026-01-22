"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVariacionesByTipoComponenteService = void 0;
class GetVariacionesByTipoComponenteService {
    constructor(tipoVariacionRepository, logger) {
        this.tipoVariacionRepository = tipoVariacionRepository;
        this.logger = logger;
    }
    async execute(id_tipo_componente) {
        this.logger.info("[Service] GetVariacionesByTipoComponenteService.execute()", {
            id_tipo_componente,
        });
        return this.tipoVariacionRepository.getByTipoComponente(id_tipo_componente);
    }
}
exports.GetVariacionesByTipoComponenteService = GetVariacionesByTipoComponenteService;
