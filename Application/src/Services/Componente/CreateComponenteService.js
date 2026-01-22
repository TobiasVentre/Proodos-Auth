"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateComponenteService = void 0;
const ensurePlanExists_1 = require("./ensurePlanExists");
class CreateComponenteService {
    constructor(componenteRepository, planRepository, logger) {
        this.componenteRepository = componenteRepository;
        this.planRepository = planRepository;
        this.logger = logger;
    }
    async execute(dto) {
        this.logger.info("[Service] CreateComponenteService.execute()");
        await (0, ensurePlanExists_1.ensurePlanExists)(this.planRepository, dto.id_plan);
        return await this.componenteRepository.create(dto);
    }
}
exports.CreateComponenteService = CreateComponenteService;
