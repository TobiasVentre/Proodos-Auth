import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { IComponenteCompuestoRepository } from "../../Interfaces/IComponenteCompuestoRepository";

export class AssignComponenteHijoService {
  constructor(
    private readonly componenteRepository: IComponenteRepository,
    private readonly compuestoRepository: IComponenteCompuestoRepository
  ) {}

  async execute(id_padre: number, id_hijo: number): Promise<{ created: boolean }> {
    const padre = await this.componenteRepository.getById(id_padre);
    if (!padre) {
      throw new Error("COMPONENTE_PADRE_NOT_FOUND");
    }

    const hijo = await this.componenteRepository.getById(id_hijo);
    if (!hijo) {
      throw new Error("COMPONENTE_HIJO_NOT_FOUND");
    }

    return this.compuestoRepository.assign(id_padre, id_hijo);
  }
}
