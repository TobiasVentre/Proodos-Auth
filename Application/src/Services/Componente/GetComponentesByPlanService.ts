import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { Componente } from "@proodos/domain/Entities/Componente";

export class GetComponentesByPlanService {
  constructor(private readonly componenteRepository: IComponenteRepository) {}

  async execute(id_plan: number): Promise<Componente[]> {
    return await this.componenteRepository.getByPlan(id_plan);
  }
}
