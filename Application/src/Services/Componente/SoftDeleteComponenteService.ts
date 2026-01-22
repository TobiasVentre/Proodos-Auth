import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { ILandingComponenteRepository } from "../../Interfaces/ILandingComponenteRepository";

export class SoftDeleteComponenteService {
  constructor(
    private readonly componenteRepository: IComponenteRepository,
    private readonly landingComponenteRepository: ILandingComponenteRepository
  ) {}

  async execute(id_componente: number): Promise<void> {
    const componente = await this.componenteRepository.getById(id_componente);

    if (!componente) {
      throw new Error("COMPONENTE_NOT_FOUND");
    }

    const isAssigned = await this.landingComponenteRepository.existsByComponente(
      id_componente
    );

    if (isAssigned) {
      throw new Error("COMPONENTE_ASSIGNED");
    }

    await this.componenteRepository.softDelete(
      id_componente,
      new Date(),
      "INACTIVO"
    );
  }
}
