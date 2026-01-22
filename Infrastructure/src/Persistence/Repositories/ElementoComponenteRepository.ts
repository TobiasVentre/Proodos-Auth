import * as Models from "../Models";
import { ElementoComponente } from "@proodos/domain/Entities/ElementoComponente";
import { IElementoComponenteRepository } from "@proodos/application/Interfaces/IElementoComponenteRepository";
import { PatchElementoComponenteDTO } from "@proodos/application/DTOs/ElementoComponente/PatchElementoComponenteDTO";
import { ElementoComponenteMapper } from "../../Mappers/ElementoComponenteMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";

export class ElementoComponenteRepository implements IElementoComponenteRepository {
  private logger: ILogger;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  async create(entity: ElementoComponente): Promise<ElementoComponente> {
    this.logger.info("[Repository] ElementoComponenteRepository.create()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const created = await Models.ElementoComponenteModel.create({
      id_componente: entity.id_componente,
      id_tipo_elemento: entity.id_tipo_elemento,
      nombre: entity.nombre,
      icono_img: entity.icono_img,
      descripcion: entity.descripcion,
      link: entity.link,
      orden: entity.orden,
      css_url: entity.css_url,
    });

    return ElementoComponenteMapper.toDomain(created);
  }

  async update(entity: ElementoComponente): Promise<ElementoComponente> {
    this.logger.info("[Repository] ElementoComponenteRepository.update()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    await Models.ElementoComponenteModel.update(
      {
        id_componente: entity.id_componente,
        id_tipo_elemento: entity.id_tipo_elemento,
        nombre: entity.nombre,
        icono_img: entity.icono_img,
        descripcion: entity.descripcion,
        link: entity.link,
        orden: entity.orden,
        css_url: entity.css_url,
      },
      { where: { id_elemento: entity.id_elemento } }
    );

    const updated = await Models.ElementoComponenteModel.findByPk(entity.id_elemento);

    if (!updated) {
      throw new Error(`ElementoComponente not found: id_elemento=${entity.id_elemento}`);
    }

    return ElementoComponenteMapper.toDomain(updated);
  }

  async patch(
    id_elemento: number,
    dto: PatchElementoComponenteDTO
  ): Promise<ElementoComponente> {
    this.logger.info("[Repository] ElementoComponenteRepository.patch()", {
      id_elemento,
    });
    this.logger.debug("[Repository] Patch DTO:", dto);

    const updatePayload: Partial<ElementoComponente> = {};

    if (dto.id_componente !== undefined) {
      updatePayload.id_componente = dto.id_componente;
    }
    if (dto.id_tipo_elemento !== undefined) {
      updatePayload.id_tipo_elemento = dto.id_tipo_elemento;
    }
    if (dto.nombre !== undefined) updatePayload.nombre = dto.nombre;
    if (dto.icono_img !== undefined) updatePayload.icono_img = dto.icono_img;
    if (dto.descripcion !== undefined) updatePayload.descripcion = dto.descripcion;
    if (dto.link !== undefined) updatePayload.link = dto.link;
    if (dto.orden !== undefined) updatePayload.orden = dto.orden;
    if (dto.css_url !== undefined) updatePayload.css_url = dto.css_url;

    if (Object.keys(updatePayload).length === 0) {
      throw new Error("No fields provided for patch");
    }

    await Models.ElementoComponenteModel.update(updatePayload, {
      where: { id_elemento },
    });

    const updated = await Models.ElementoComponenteModel.findByPk(id_elemento);

    if (!updated) {
      throw new Error(`ElementoComponente not found: id_elemento=${id_elemento}`);
    }

    return ElementoComponenteMapper.toDomain(updated);
  }

  async getById(id_elemento: number): Promise<ElementoComponente | null> {
    this.logger.info("[Repository] ElementoComponenteRepository.getById()");

    const row = await Models.ElementoComponenteModel.findByPk(id_elemento);

    return row ? ElementoComponenteMapper.toDomain(row) : null;
  }

  async getAll(): Promise<ElementoComponente[]> {
    this.logger.info("[Repository] ElementoComponenteRepository.getAll()");

    const rows = await Models.ElementoComponenteModel.findAll({
      order: [["id_elemento", "DESC"]],
    });

    return rows.map((row: any) => ElementoComponenteMapper.toDomain(row));
  }

  async getByComponente(id_componente: number): Promise<ElementoComponente[]> {
    this.logger.info("[Repository] ElementoComponenteRepository.getByComponente()", {
      id_componente,
    });

    const rows = await Models.ElementoComponenteModel.findAll({
      where: { id_componente },
      order: [["orden", "ASC"]],
    });

    return rows.map((row: any) => ElementoComponenteMapper.toDomain(row));
  }

  async delete(id_elemento: number): Promise<void> {
    this.logger.info("[Repository] ElementoComponenteRepository.delete()", {
      id_elemento,
    });

    await Models.ElementoComponenteModel.destroy({ where: { id_elemento } });
  }
}
