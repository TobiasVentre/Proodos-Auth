import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";

export class UnassignComponenteFromLandingService {
  constructor(private readonly landingComponenteRepository: ILandingComponenteRepository) {}

  async execute(id_landing: number, id_componente: number): Promise<void> {
    await this.landingComponenteRepository.unassign(id_landing, id_componente);
  }
}
