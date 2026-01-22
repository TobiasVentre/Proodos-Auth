import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";

export class ExistsLandingComponenteService {
  constructor(private readonly landingComponenteRepository: ILandingComponenteRepository) {}

  async execute(id_landing: number, id_componente: number): Promise<boolean> {
    return await this.landingComponenteRepository.exists(id_landing, id_componente);
  }
}
