import { ILandingComponenteRepository } from "@proodos/application/Interfaces/ILandingComponenteRepository";
import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";

import { LandingComponenteModel, LandingPageModel, ComponenteModel } from "../Models";
import { LandingComponenteMapper } from "../../Mappers/LandingComponenteMapper";

export class LandingComponenteRepository implements ILandingComponenteRepository {
  async assign(entity: LandingComponente): Promise<LandingComponente> {
    await LandingComponenteModel.create({
      id_landing: entity.id_landing,
      id_componente: entity.id_componente,
    });

    const created = await LandingComponenteModel.findOne({
      where: { id_landing: entity.id_landing, id_componente: entity.id_componente },
      include: [
        { model: LandingPageModel, as: "landing", required: false },
        { model: ComponenteModel, as: "componente", required: false },
      ],
    });

    if (!created) {
      throw new Error("LANDING_COMPONENTE_NOT_FOUND");
    }

    return LandingComponenteMapper.toDomain(created);
  }

  async unassign(id_landing: number, id_componente: number): Promise<void> {
    await LandingComponenteModel.destroy({
      where: { id_landing, id_componente },
    });
  }

  async getByLanding(id_landing: number): Promise<LandingComponente[]> {
    const rows = await LandingComponenteModel.findAll({
      where: { id_landing },
      include: [
        { model: LandingPageModel, as: "landing", required: false },
        { model: ComponenteModel, as: "componente", required: false },
      ],
    });

    return rows.map((r) => LandingComponenteMapper.toDomain(r));
  }

  async getByComponente(id_componente: number): Promise<LandingComponente[]> {
    const rows = await LandingComponenteModel.findAll({
      where: { id_componente },
      include: [
        { model: LandingPageModel, as: "landing", required: false },
        { model: ComponenteModel, as: "componente", required: false },
      ],
    });

    return rows.map((r) => LandingComponenteMapper.toDomain(r));
  }

  async exists(id_landing: number, id_componente: number): Promise<boolean> {
    const row = await LandingComponenteModel.findOne({
      where: { id_landing, id_componente },
    });

    return row !== null;
  }

  async existsByComponente(id_componente: number): Promise<boolean> {
    const row = await LandingComponenteModel.findOne({
      where: { id_componente },
    });

    return row !== null;
  }
}
