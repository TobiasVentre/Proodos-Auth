"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPlansService = void 0;
class GetAllPlansService {
    constructor(planRepository, logger) {
        this.planRepository = planRepository;
        this.logger = logger;
    }
    async execute() {
        this.logger.info("[Service] GetAllPlansService.execute()");
        return await this.planRepository.getAll();
    }
}
exports.GetAllPlansService = GetAllPlansService;
