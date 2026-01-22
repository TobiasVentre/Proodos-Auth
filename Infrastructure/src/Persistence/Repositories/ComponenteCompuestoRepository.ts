import { IComponenteCompuestoRepository } from "@proodos/application/Interfaces/IComponenteCompuestoRepository";
import { ComponenteCompuesto } from "@proodos/domain/Entities/ComponenteCompuesto";
import { ComponenteCompuestoModel } from "../Models";

export class ComponenteCompuestoRepository implements IComponenteCompuestoRepository {
  async assign(id_padre: number, id_hijo: number): Promise<{ created: boolean }> {
    const [row, created] = await ComponenteCompuestoModel.findOrCreate({
      where: { id_padre, id_hijo },
      defaults: { id_padre, id_hijo },
    });

    return { created };
  }

  async unassign(id_padre: number, id_hijo: number): Promise<void> {
    await ComponenteCompuestoModel.destroy({ where: { id_padre, id_hijo } });
  }

  async getAll(): Promise<ComponenteCompuesto[]> {
    const rows = await ComponenteCompuestoModel.findAll();

    return rows.map((row) => ({
      id_padre: row.id_padre,
      id_hijo: row.id_hijo,
    }));
  }
}
