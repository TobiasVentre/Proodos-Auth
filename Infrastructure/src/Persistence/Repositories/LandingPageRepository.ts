import { ILandingPageRepository } from "@proodos/application/Interfaces/ILandingPageRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

import { LandingPageModel } from "../Models";
import { LandingPageMapper } from "../../Mappers/LandingPageMapper";

export class LandingPageRepository implements ILandingPageRepository {
  constructor(private readonly logger: ILogger) {}

  async create(entity: LandingPage): Promise<LandingPage> {
    this.logger.info("[Repository] LandingPageRepository.create()");

    const created = await LandingPageModel.create({
      URL: entity.URL,
      estado: entity.estado,
      segmento: entity.segmento,
    });

    return LandingPageMapper.toDomain(created);
  }

  async update(entity: LandingPage): Promise<LandingPage> {
    this.logger.info("[Repository] LandingPageRepository.update()", { id_landing: entity.id_landing });

    await LandingPageModel.update(
      {
        URL: entity.URL,
        estado: entity.estado,
        segmento: entity.segmento,
      },
      {
        where: { id_landing: entity.id_landing },
      }
    );

    const updated = await LandingPageModel.findByPk(entity.id_landing);
    return updated ? LandingPageMapper.toDomain(updated) : null as any;
  }

  async delete(id_landing: number): Promise<void> {
    this.logger.info("[Repository] LandingPageRepository.delete()", { id_landing });
    await LandingPageModel.destroy({ where: { id_landing } });
  }

  async getById(id_landing: number): Promise<LandingPage | null> {
    this.logger.info("[Repository] LandingPageRepository.getById()", { id_landing });
    const row = await LandingPageModel.findByPk(id_landing);
    return row ? LandingPageMapper.toDomain(row) : null;
  }

  async getAll(): Promise<LandingPage[]> {
    this.logger.info("[Repository] LandingPageRepository.getAll()");

    const rows = await LandingPageModel.findAll({
      order: [["id_landing", "DESC"]],
    });

    return rows.map((r) => LandingPageMapper.toDomain(r));
  }
}
