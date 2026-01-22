import { CreatePlanDTO } from "../../DTOs/Plan/CreatePlanDTO";
import { mapCreatePlanDTOToEntity } from "../../DTOs/Plan/PlanDTOMapper";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { CreatePlanUseCase } from "../../Ports/PlanUseCases";
import { ILogger } from "../../Interfaces/ILogger";
import { Plan } from "@proodos/domain/Entities/Plan";

export class CreatePlanService implements CreatePlanUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: CreatePlanDTO): Promise<Plan> {
    this.logger.info("[Service] CreatePlanService.execute()");
    const plan = mapCreatePlanDTOToEntity(dto);
    return await this.planRepository.create(plan);
  }
}
