"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlanService = void 0;
const PlanDTOMapper_1 = require("../../DTOs/Plan/PlanDTOMapper");
class CreatePlanService {
    constructor(planRepository, logger) {
        this.planRepository = planRepository;
        this.logger = logger;
    }
    async execute(dto) {
        this.logger.info("[Service] CreatePlanService.execute()");
        const plan = (0, PlanDTOMapper_1.mapCreatePlanDTOToEntity)(dto);
        return await this.planRepository.create(plan);
    }
}
exports.CreatePlanService = CreatePlanService;
