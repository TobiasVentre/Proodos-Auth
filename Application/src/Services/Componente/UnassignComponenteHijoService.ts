import { IComponenteCompuestoRepository } from "../../Interfaces/IComponenteCompuestoRepository";

export class UnassignComponenteHijoService {
  constructor(private readonly compuestoRepository: IComponenteCompuestoRepository) {}

  async execute(id_padre: number, id_hijo: number): Promise<void> {
    await this.compuestoRepository.unassign(id_padre, id_hijo);
  }
}
