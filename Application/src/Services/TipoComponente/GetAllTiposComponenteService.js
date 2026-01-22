"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTiposComponenteService = void 0;
class GetAllTiposComponenteService {
    constructor(tipoComponenteRepository, logger) {
        this.tipoComponenteRepository = tipoComponenteRepository;
        this.logger = logger;
    }
    async execute() {
        this.logger.info("[Service] GetAllTiposComponenteService.execute()");
        return this.tipoComponenteRepository.getAll();
    }
}
exports.GetAllTiposComponenteService = GetAllTiposComponenteService;
