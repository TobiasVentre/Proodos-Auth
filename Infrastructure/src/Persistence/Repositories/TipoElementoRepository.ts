import * as Models from "../Models";
import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { ITipoElementoRepository } from "@proodos/application/Interfaces/ITipoElementoRepository";
import { PatchTipoElementoDTO } from "@proodos/application/DTOs/TipoElemento/PatchTipoElementoDTO";
import { TipoElementoMapper } from "../../Mappers/TipoElementoMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";

export class TipoElementoRepository implements ITipoElementoRepository {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async create(entity: TipoElemento): Promise<TipoElemento> {
    this.logger.info("[Repository] TipoElementoRepository.create()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const created = await Models.TipoElementoModel.create({
      nombre: entity.nombre,
    });

    return TipoElementoMapper.toDomain(created);
  }

  async update(entity: TipoElemento): Promise<TipoElemento> {
    this.logger.info("[Repository] TipoElementoRepository.update()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    await Models.TipoElementoModel.update(
      {
        nombre: entity.nombre,
      },
      { where: { id_tipo_elemento: entity.id_tipo_elemento } }
    );

    const updated = await Models.TipoElementoModel.findByPk(entity.id_tipo_elemento);

    if (!updated) {
      throw new Error(`TipoElemento not found: id_tipo_elemento=${entity.id_tipo_elemento}`);
    }

    return TipoElementoMapper.toDomain(updated);
  }

  async patch(
    id_tipo_elemento: number,
    dto: PatchTipoElementoDTO
  ): Promise<TipoElemento> {
    this.logger.info("[Repository] TipoElementoRepository.patch()", {
      id_tipo_elemento,
    });
    this.logger.debug("[Repository] Patch DTO:", dto);

    const updatePayload: Partial<TipoElemento> = {};

    if (dto.nombre !== undefined) updatePayload.nombre = dto.nombre;

    if (Object.keys(updatePayload).length === 0) {
      throw new Error("No fields provided for patch");
    }

    await Models.TipoElementoModel.update(updatePayload, {
      where: { id_tipo_elemento },
    });

    const updated = await Models.TipoElementoModel.findByPk(id_tipo_elemento);

    if (!updated) {
      throw new Error(`TipoElemento not found: id_tipo_elemento=${id_tipo_elemento}`);
    }

    return TipoElementoMapper.toDomain(updated);
  }

  async getById(id_tipo_elemento: number): Promise<TipoElemento | null> {
    this.logger.info("[Repository] TipoElementoRepository.getById()");

    const row = await Models.TipoElementoModel.findByPk(id_tipo_elemento);

    return row ? TipoElementoMapper.toDomain(row) : null;
  }

  async getAll(): Promise<TipoElemento[]> {
    this.logger.info("[Repository] TipoElementoRepository.getAll()");

    const rows = await Models.TipoElementoModel.findAll({
      order: [["id_tipo_elemento", "DESC"]],
    });

    return rows.map((row: any) => TipoElementoMapper.toDomain(row));
  }

  async delete(id_tipo_elemento: number): Promise<void> {
    this.logger.info("[Repository] TipoElementoRepository.delete()", {
      id_tipo_elemento,
    });

    await Models.TipoElementoModel.destroy({ where: { id_tipo_elemento } });
  }

  async exists(id_tipo_elemento: number): Promise<boolean> {
    this.logger.info("[Repository] TipoElementoRepository.exists()");

    const count = await Models.TipoElementoModel.count({
      where: { id_tipo_elemento },
    });

    return count > 0;
  }
}
