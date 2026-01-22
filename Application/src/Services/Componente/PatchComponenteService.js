"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchComponenteService = void 0;
const ensurePlanExists_1 = require("./ensurePlanExists");
class PatchComponenteService {
    constructor(repo, planRepository) {
        this.repo = repo;
        this.planRepository = planRepository;
    }
    async execute(id_componente, dto) {
        if (dto.id_plan !== undefined) {
            await (0, ensurePlanExists_1.ensurePlanExists)(this.planRepository, dto.id_plan);
        }
        return this.repo.patch(id_componente, dto);
    }
}
exports.PatchComponenteService = PatchComponenteService;
