import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";
import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { AssignLandingComponenteUseCase } from "../../Ports/LandingComponenteUseCases";
import { ILogger } from "../../Interfaces/ILogger";

export class AssignLandingComponenteService implements AssignLandingComponenteUseCase {
  constructor(
    private readonly landingPageRepository: ILandingPageRepository,
    private readonly componenteRepository: IComponenteRepository,
    private readonly landingComponenteRepository: ILandingComponenteRepository,
    private readonly logger: ILogger
  ) {}

  async execute(
    id_landing: number,
    id_componente: number
  ): Promise<{ data: LandingComponente; existed: boolean }> {
    this.logger.info("[Service] AssignLandingComponenteService.execute()", { id_landing, id_componente });

    const landing = await this.landingPageRepository.getById(id_landing);
    if (!landing) throw new Error("LANDING_NOT_FOUND");

    const componente = await this.componenteRepository.getById(id_componente);
    if (!componente) throw new Error("COMPONENTE_NOT_FOUND");

    const already = await this.landingComponenteRepository.exists(id_landing, id_componente);
    if (already) {
      // idempotente
      return { data: { id_landing, id_componente }, existed: true };
    }

    const data = await this.landingComponenteRepository.assign({ id_landing, id_componente });
    return { data, existed: false };
  }
}
