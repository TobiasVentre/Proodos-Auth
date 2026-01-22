"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetElementoComponenteByIdService = void 0;
class GetElementoComponenteByIdService {
    constructor(elementoComponenteRepository, logger) {
        this.elementoComponenteRepository = elementoComponenteRepository;
        this.logger = logger;
    }
    async execute(id_elemento) {
        this.logger.info("[Service] GetElementoComponenteByIdService.execute()", {
            id_elemento,
        });
        return this.elementoComponenteRepository.getById(id_elemento);
    }
}
exports.GetElementoComponenteByIdService = GetElementoComponenteByIdService;
