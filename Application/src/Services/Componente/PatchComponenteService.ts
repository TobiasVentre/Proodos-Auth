import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { PatchComponenteDTO } from "../../DTOs/Componente/PatchComponenteDTO";
import { Componente } from "@proodos/domain/Entities/Componente";
import { PatchComponenteUseCase } from "../../Ports/ComponenteUseCases";
import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ensurePlanExists } from "./ensurePlanExists";

export class PatchComponenteService implements PatchComponenteUseCase {
  constructor(
    private readonly repo: IComponenteRepository,
    private readonly planRepository: IPlanRepository
  ) {}

  async execute(id_componente: number, dto: PatchComponenteDTO): Promise<Componente> {
    if (dto.id_plan !== undefined) {
      await ensurePlanExists(this.planRepository, dto.id_plan);
    }
    return this.repo.patch(id_componente, dto);
  }
}
