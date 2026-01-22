"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTiposElementoService = void 0;
class GetAllTiposElementoService {
    constructor(tipoElementoRepository, logger) {
        this.tipoElementoRepository = tipoElementoRepository;
        this.logger = logger;
    }
    async execute() {
        this.logger.info("[Service] GetAllTiposElementoService.execute()");
        return this.tipoElementoRepository.getAll();
    }
}
exports.GetAllTiposElementoService = GetAllTiposElementoService;
