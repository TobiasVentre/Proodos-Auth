"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTiposVariacionService = void 0;
class GetAllTiposVariacionService {
    constructor(tipoVariacionRepository, logger) {
        this.tipoVariacionRepository = tipoVariacionRepository;
        this.logger = logger;
    }
    async execute() {
        this.logger.info("[Service] GetAllTiposVariacionService.execute()");
        return this.tipoVariacionRepository.getAll();
    }
}
exports.GetAllTiposVariacionService = GetAllTiposVariacionService;
