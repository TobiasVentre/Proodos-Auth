"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetElementosByComponenteService = void 0;
class GetElementosByComponenteService {
    constructor(elementoComponenteRepository, logger) {
        this.elementoComponenteRepository = elementoComponenteRepository;
        this.logger = logger;
    }
    async execute(id_componente) {
        this.logger.info("[Service] GetElementosByComponenteService.execute()", {
            id_componente,
        });
        return this.elementoComponenteRepository.getByComponente(id_componente);
    }
}
exports.GetElementosByComponenteService = GetElementosByComponenteService;
