"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTipoComponenteByIdService = void 0;
class GetTipoComponenteByIdService {
    constructor(tipoComponenteRepository, logger) {
        this.tipoComponenteRepository = tipoComponenteRepository;
        this.logger = logger;
    }
    async execute(id_tipo_componente) {
        this.logger.info("[Service] GetTipoComponenteByIdService.execute()", {
            id_tipo_componente,
        });
        return this.tipoComponenteRepository.getById(id_tipo_componente);
    }
}
exports.GetTipoComponenteByIdService = GetTipoComponenteByIdService;
