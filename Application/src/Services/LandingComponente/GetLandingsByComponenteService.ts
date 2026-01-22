import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";

export class GetLandingsByComponenteService {
  constructor(private readonly landingComponenteRepository: ILandingComponenteRepository) {}

  async execute(id_componente: number): Promise<LandingComponente[]> {
    return await this.landingComponenteRepository.getByComponente(id_componente);
  }
}
