import * as Models from "../Models";
import { ComponenteMapper } from "../../Mappers/ComponenteMapper";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { PatchComponenteDTO } from "@proodos/application/DTOs/Componente/PatchComponenteDTO";
import { Componente } from "@proodos/domain/Entities/Componente";
import { IComponenteRepository } from "@proodos/application/Interfaces/IComponenteRepository";
import { sequelize } from "../../Config/SequelizeConfig";

export class ComponenteRepository implements IComponenteRepository {
  private logger: ILogger;
  private softDeleteSupported?: boolean;

  constructor(logger: ILogger) {
    this.logger = logger;
  }

  private async resolveSoftDeleteSupport(): Promise<boolean> {
    if (this.softDeleteSupported !== undefined) {
      return this.softDeleteSupported;
    }

    try {
      const [rows] = await sequelize.query(
        "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'componente' AND COLUMN_NAME IN ('estado','fecha_baja')"
      );
      const columnNames = Array.isArray(rows)
        ? rows.map((row: any) => String(row.COLUMN_NAME || "").toLowerCase())
        : [];
      this.softDeleteSupported =
        columnNames.includes("estado") && columnNames.includes("fecha_baja");
    } catch (error) {
      this.logger.error("[Repository] Failed to resolve soft delete support", error);
      this.softDeleteSupported = false;
    }

    return this.softDeleteSupported;
  }

  private async buildAttributes(): Promise<string[]> {
    const baseAttributes = [
      "id_componente",
      "id_tipo_componente",
      "id_plan",
      "id_tipo_variacion",
      "nombre",
      "fecha_creacion",
    ];

    if (await this.resolveSoftDeleteSupport()) {
      baseAttributes.push("estado", "fecha_baja");
    }

    return baseAttributes;
  }

  async create(entity: Componente): Promise<Componente> {
    this.logger.info("[Repository] ComponenteRepository.create()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const payload: Record<string, unknown> = {
      id_tipo_componente: entity.id_tipo_componente,
      id_plan: entity.id_plan,
      id_tipo_variacion: entity.id_tipo_variacion,
      nombre: entity.nombre,
      // en DB ya tenés default; si querés dejarlo a DB, eliminá esta línea
      fecha_creacion: new Date(),
      estado: entity.estado ?? "ACTIVO",
      fecha_baja: entity.fecha_baja ?? null,
    };

    const created = await Models.ComponenteModel.create(payload);

    return ComponenteMapper.toDomain(created);
  }

  async update(entity: Componente): Promise<Componente> {
    this.logger.info("[Repository] ComponenteRepository.update()");
    this.logger.debug("[Repository] Datos recibidos:", entity);

    const payload: Record<string, unknown> = {
      id_tipo_componente: entity.id_tipo_componente,
      id_plan: entity.id_plan,
      id_tipo_variacion: entity.id_tipo_variacion,
      nombre: entity.nombre,
      fecha_creacion: entity.fecha_creacion,
      estado: entity.estado,
      fecha_baja: entity.fecha_baja ?? null,
    };

    await Models.ComponenteModel.update(payload, {
      where: { id_componente: entity.id_componente },
    });

    const updated = await Models.ComponenteModel.findByPk(entity.id_componente);

    if (!updated) {
      // Para cumplir el contrato: Promise<Componente>
      throw new Error(`Componente not found: id_componente=${entity.id_componente}`);
    }

    return ComponenteMapper.toDomain(updated);
  }

  async patch(id_componente: number, dto: PatchComponenteDTO): Promise<Componente> {
  this.logger.info("[Repository] ComponenteRepository.patch()", { id_componente });
  this.logger.debug("[Repository] Patch DTO:", dto);

  // Construimos dinámicamente solo lo que vino
  const updatePayload: any = {};

  if (dto.id_tipo_componente !== undefined) updatePayload.id_tipo_componente = dto.id_tipo_componente;
  if (dto.id_plan !== undefined) updatePayload.id_plan = dto.id_plan;
  if (dto.id_tipo_variacion !== undefined) updatePayload.id_tipo_variacion = dto.id_tipo_variacion;
  if (dto.nombre !== undefined) updatePayload.nombre = dto.nombre;
  if (dto.estado !== undefined) updatePayload.estado = dto.estado;
  if (dto.fecha_baja !== undefined) updatePayload.fecha_baja = dto.fecha_baja;

  // Si no vino nada, no hacemos nada (o podés lanzar error 400 desde Service/Controller)
  if (Object.keys(updatePayload).length === 0) {
    throw new Error("No fields provided for patch");
  }

  await Models.ComponenteModel.update(updatePayload, {
    where: { id_componente },
  });

  const updated = await Models.ComponenteModel.findByPk(id_componente);

  if (!updated) {
    throw new Error(`Componente not found: id_componente=${id_componente}`);
  }

  return ComponenteMapper.toDomain(updated);
}

  async delete(id_componente: number): Promise<void> {
    await Models.ComponenteModel.destroy({ where: { id_componente } });
  }

  async softDelete(id_componente: number, fecha_baja: Date, estado: string): Promise<void> {
    await Models.ComponenteModel.update({ fecha_baja, estado }, { where: { id_componente } });
  }

  async getById(id: number): Promise<Componente | null> {
    this.logger.info("[Repository] ComponenteRepository.getById(id)");

    const row = await Models.ComponenteModel.findOne({
      where: { id_componente: id, estado: "ACTIVO" },
      include: [
        { model: Models.TipoComponenteModel, as: "tipoComponente", required: false },
        { model: Models.TipoVariacionModel, as: "tipoVariacion", required: false },
        { model: Models.PlanModel, as: "plan", required: false },
      ],
    });

    return row ? ComponenteMapper.toDomain(row) : null;
  }

  async getAll(): Promise<Componente[]> {
    this.logger.info("[Repository] ComponenteRepository.getAll()");

    const attributes = await this.buildAttributes();
    const supportsSoftDelete = await this.resolveSoftDeleteSupport();

    const rows = await Models.ComponenteModel.findAll({
      where: { estado: "ACTIVO" },
      order: [["id_componente", "DESC"]],
      include: [
        { model: Models.TipoComponenteModel, as: "tipoComponente", required: false },
        { model: Models.TipoVariacionModel, as: "tipoVariacion", required: false },
        { model: Models.PlanModel, as: "plan", required: false },
      ],
    });

    return rows.map((r: any) => ComponenteMapper.toDomain(r));
  }

  async getByPlan(id_plan: number): Promise<Componente[]> {
    this.logger.info("[Repository] ComponenteRepository.getByPlan(id_plan)");

    const attributes = await this.buildAttributes();
    const supportsSoftDelete = await this.resolveSoftDeleteSupport();

    const rows = await Models.ComponenteModel.findAll({
      where: { id_plan, estado: "ACTIVO" },
      order: [["id_componente", "DESC"]],
      include: [
        { model: Models.TipoComponenteModel, as: "tipoComponente", required: false },
        { model: Models.TipoVariacionModel, as: "tipoVariacion", required: false },
        { model: Models.PlanModel, as: "plan", required: false },
      ],
    });

    return rows.map((r: any) => ComponenteMapper.toDomain(r));
  }
}
