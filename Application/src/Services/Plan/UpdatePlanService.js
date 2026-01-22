"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePlanService = void 0;
const PlanDTOMapper_1 = require("../../DTOs/Plan/PlanDTOMapper");
class UpdatePlanService {
    constructor(planRepository, logger) {
        this.planRepository = planRepository;
        this.logger = logger;
    }
    async execute(dto) {
        this.logger.info("[Service] UpdatePlanService.execute()");
        const plan = (0, PlanDTOMapper_1.mapUpdatePlanDTOToEntity)(dto);
        return await this.planRepository.update(plan);
    }
}
exports.UpdatePlanService = UpdatePlanService;
