import { PatchPlanDTO } from "../../DTOs/Plan/PatchPlanDTO";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { PatchPlanUseCase } from "../../Ports/PlanUseCases";
import { ILogger } from "../../Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";

export class PatchPlanService implements PatchPlanUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_plan: number, dto: PatchPlanDTO): Promise<Plan> {
    this.logger.info("[Service] PatchPlanService.execute()", { id_plan });
    return await this.planRepository.patch(id_plan, dto);
  }
}
