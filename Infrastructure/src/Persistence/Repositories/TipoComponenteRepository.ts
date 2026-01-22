import * as Models from "../Models";
import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { ITipoComponenteRepository } from "@proodos/application/Interfaces/ITipoComponenteRepository";
import { PatchTipoComponenteDTO } from "@proodos/application/DTOs/TipoComponente/PatchTipoComponenteDTO";
import { TipoComponenteMapper } from "../../Mappers/TipoComponenteMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";

export class TipoComponenteRepository implements ITipoComponenteRepository {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async create(entity: TipoComponente): Promise<TipoComponente> {
    this.logger.info("[Repository] TipoComponenteRepository.create()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const created = await Models.TipoComponenteModel.create({
      nombre: entity.nombre,
      estado: entity.estado,
    });

    return TipoComponenteMapper.toDomain(created);
  }

  async update(entity: TipoComponente): Promise<TipoComponente> {
    this.logger.info("[Repository] TipoComponenteRepository.update()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    await Models.TipoComponenteModel.update(
      {
        nombre: entity.nombre,
        estado: entity.estado,
      },
      { where: { id_tipo_componente: entity.id_tipo_componente } }
    );

    const updated = await Models.TipoComponenteModel.findByPk(
      entity.id_tipo_componente
    );

    if (!updated) {
      throw new Error(`TipoComponente not found: id_tipo_componente=${entity.id_tipo_componente}`);
    }

    return TipoComponenteMapper.toDomain(updated);
  }

  async patch(
    id_tipo_componente: number,
    dto: PatchTipoComponenteDTO
  ): Promise<TipoComponente> {
    this.logger.info("[Repository] TipoComponenteRepository.patch()", {
      id_tipo_componente,
    });
    this.logger.debug("[Repository] Patch DTO:", dto);

    const updatePayload: Partial<TipoComponente> = {};

    if (dto.nombre !== undefined) updatePayload.nombre = dto.nombre;
    if (dto.estado !== undefined) updatePayload.estado = dto.estado;

    if (Object.keys(updatePayload).length === 0) {
      throw new Error("No fields provided for patch");
    }

    await Models.TipoComponenteModel.update(updatePayload, {
      where: { id_tipo_componente },
    });

    const updated = await Models.TipoComponenteModel.findByPk(id_tipo_componente);

    if (!updated) {
      throw new Error(`TipoComponente not found: id_tipo_componente=${id_tipo_componente}`);
    }

    return TipoComponenteMapper.toDomain(updated);
  }

  async getById(id_tipo_componente: number): Promise<TipoComponente | null> {
    this.logger.info("[Repository] TipoComponenteRepository.getById()");

    const row = await Models.TipoComponenteModel.findByPk(id_tipo_componente);

    return row ? TipoComponenteMapper.toDomain(row) : null;
  }

  async getAll(): Promise<TipoComponente[]> {
    this.logger.info("[Repository] TipoComponenteRepository.getAll()");

    const rows = await Models.TipoComponenteModel.findAll({
      order: [["id_tipo_componente", "DESC"]],
    });

    return rows.map((row: any) => TipoComponenteMapper.toDomain(row));
  }

  async exists(id_tipo_componente: number): Promise<boolean> {
    this.logger.info("[Repository] TipoComponenteRepository.exists()");

    const count = await Models.TipoComponenteModel.count({
      where: { id_tipo_componente },
    });

    return count > 0;
  }
}
