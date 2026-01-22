import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";

export class GetLandingComponentesService {
  constructor(private readonly landingComponenteRepository: ILandingComponenteRepository) {}

  async execute(id_landing: number): Promise<LandingComponente[]> {
    return await this.landingComponenteRepository.getByLanding(id_landing);
  }
}
