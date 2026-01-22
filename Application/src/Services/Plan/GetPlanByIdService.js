"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlanByIdService = void 0;
class GetPlanByIdService {
    constructor(planRepository, logger) {
        this.planRepository = planRepository;
        this.logger = logger;
    }
    async execute(id_plan) {
        this.logger.info("[Service] GetPlanByIdService.execute()");
        return await this.planRepository.getById(id_plan);
    }
}
exports.GetPlanByIdService = GetPlanByIdService;
