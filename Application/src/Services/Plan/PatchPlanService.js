"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchPlanService = void 0;
class PatchPlanService {
    constructor(planRepository, logger) {
        this.planRepository = planRepository;
        this.logger = logger;
    }
    async execute(id_plan, dto) {
        this.logger.info("[Service] PatchPlanService.execute()", { id_plan });
        return await this.planRepository.patch(id_plan, dto);
    }
}
exports.PatchPlanService = PatchPlanService;
