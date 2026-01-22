import { UpdatePlanDTO } from "../../DTOs/Plan/UpdatePlanDTO";
import { mapUpdatePlanDTOToEntity } from "../../DTOs/Plan/PlanDTOMapper";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { UpdatePlanUseCase } from "../../Ports/PlanUseCases";
import { ILogger } from "../../Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";

export class UpdatePlanService implements UpdatePlanUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: UpdatePlanDTO): Promise<Plan> {
    this.logger.info("[Service] UpdatePlanService.execute()");
    const plan = mapUpdatePlanDTOToEntity(dto);
    return await this.planRepository.update(plan);
  }
}
