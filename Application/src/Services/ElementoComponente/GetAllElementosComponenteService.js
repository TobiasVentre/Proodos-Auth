"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllElementosComponenteService = void 0;
class GetAllElementosComponenteService {
    constructor(elementoComponenteRepository, logger) {
        this.elementoComponenteRepository = elementoComponenteRepository;
        this.logger = logger;
    }
    async execute() {
        this.logger.info("[Service] GetAllElementosComponenteService.execute()");
        return this.elementoComponenteRepository.getAll();
    }
}
exports.GetAllElementosComponenteService = GetAllElementosComponenteService;
