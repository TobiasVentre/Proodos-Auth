import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { Plan } from "@proodos/domain/Entities/Plan";
import { GetPlanByIdUseCase } from "../../Ports/PlanUseCases";
import { ILogger } from "../../Interfaces/ILogger";

export class GetPlanByIdService implements GetPlanByIdUseCase {
  constructor(
    private readonly planRepository: IPlanRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_plan: number): Promise<Plan | null> {
    this.logger.info("[Service] GetPlanByIdService.execute()");
    return await this.planRepository.getById(id_plan);
  }
}
