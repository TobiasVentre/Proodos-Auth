import * as Models from "../Models";
import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { ITipoVariacionRepository } from "@proodos/application/Interfaces/ITipoVariacionRepository";
import { PatchTipoVariacionDTO } from "@proodos/application/DTOs/TipoVariacion/PatchTipoVariacionDTO";
import { TipoVariacionMapper } from "../../Mappers/TipoVariacionMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";

export class TipoVariacionRepository implements ITipoVariacionRepository {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async create(entity: TipoVariacion): Promise<TipoVariacion> {
    this.logger.info("[Repository] TipoVariacionRepository.create()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const created = await Models.TipoVariacionModel.create({
      id_tipo_componente: entity.id_tipo_componente,
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      css_url: entity.css_url,
      js_url: entity.js_url,
      html: entity.html,
    });

    return TipoVariacionMapper.toDomain(created);
  }

  async update(entity: TipoVariacion): Promise<TipoVariacion> {
    this.logger.info("[Repository] TipoVariacionRepository.update()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    await Models.TipoVariacionModel.update(
      {
        id_tipo_componente: entity.id_tipo_componente,
        nombre: entity.nombre,
        descripcion: entity.descripcion,
        css_url: entity.css_url,
        js_url: entity.js_url,
        html: entity.html,
      },
      { where: { id_tipo_variacion: entity.id_tipo_variacion } }
    );

    const updated = await Models.TipoVariacionModel.findByPk(
      entity.id_tipo_variacion
    );

    if (!updated) {
      throw new Error(`TipoVariacion not found: id_tipo_variacion=${entity.id_tipo_variacion}`);
    }

    return TipoVariacionMapper.toDomain(updated);
  }

  async patch(
    id_tipo_variacion: number,
    dto: PatchTipoVariacionDTO
  ): Promise<TipoVariacion> {
    this.logger.info("[Repository] TipoVariacionRepository.patch()", {
      id_tipo_variacion,
    });
    this.logger.debug("[Repository] Patch DTO:", dto);

    const updatePayload: Partial<TipoVariacion> = {};

    if (dto.id_tipo_componente !== undefined) {
      updatePayload.id_tipo_componente = dto.id_tipo_componente;
    }
    if (dto.nombre !== undefined) updatePayload.nombre = dto.nombre;
    if (dto.descripcion !== undefined) updatePayload.descripcion = dto.descripcion;
    if (dto.css_url !== undefined) updatePayload.css_url = dto.css_url;
    if (dto.js_url !== undefined) updatePayload.js_url = dto.js_url;
    if (dto.html !== undefined) updatePayload.html = dto.html;

    if (Object.keys(updatePayload).length === 0) {
      throw new Error("No fields provided for patch");
    }

    await Models.TipoVariacionModel.update(updatePayload, {
      where: { id_tipo_variacion },
    });

    const updated = await Models.TipoVariacionModel.findByPk(id_tipo_variacion);

    if (!updated) {
      throw new Error(`TipoVariacion not found: id_tipo_variacion=${id_tipo_variacion}`);
    }

    return TipoVariacionMapper.toDomain(updated);
  }

  async getById(id_tipo_variacion: number): Promise<TipoVariacion | null> {
    this.logger.info("[Repository] TipoVariacionRepository.getById()");

    const row = await Models.TipoVariacionModel.findByPk(id_tipo_variacion);

    return row ? TipoVariacionMapper.toDomain(row) : null;
  }

  async getAll(): Promise<TipoVariacion[]> {
    this.logger.info("[Repository] TipoVariacionRepository.getAll()");

    const rows = await Models.TipoVariacionModel.findAll({
      order: [["id_tipo_variacion", "DESC"]],
    });

    return rows.map((row: any) => TipoVariacionMapper.toDomain(row));
  }

  async getByTipoComponente(id_tipo_componente: number): Promise<TipoVariacion[]> {
    this.logger.info("[Repository] TipoVariacionRepository.getByTipoComponente()", {
      id_tipo_componente,
    });

    const rows = await Models.TipoVariacionModel.findAll({
      where: { id_tipo_componente },
      order: [["id_tipo_variacion", "DESC"]],
    });

    return rows.map((row: any) => TipoVariacionMapper.toDomain(row));
  }
}
