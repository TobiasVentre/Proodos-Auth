"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetComponentesByPlanService = void 0;
class GetComponentesByPlanService {
    constructor(componenteRepository) {
        this.componenteRepository = componenteRepository;
    }
    async execute(id_plan) {
        return await this.componenteRepository.getByPlan(id_plan);
    }
}
exports.GetComponentesByPlanService = GetComponentesByPlanService;
