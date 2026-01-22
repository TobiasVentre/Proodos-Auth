"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponenteRepository = void 0;
const Models = __importStar(require("../Models"));
const ComponenteMapper_1 = require("../../Mappers/ComponenteMapper");
const SequelizeConfig_1 = require("../../Config/SequelizeConfig");
class ComponenteRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async resolveSoftDeleteSupport() {
        if (this.softDeleteSupported !== undefined) {
            return this.softDeleteSupported;
        }
        try {
            const [rows] = await SequelizeConfig_1.sequelize.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'dbo' AND TABLE_NAME = 'componente' AND COLUMN_NAME IN ('estado','fecha_baja')");
            const columnNames = Array.isArray(rows)
                ? rows.map((row) => String(row.COLUMN_NAME || "").toLowerCase())
                : [];
            this.softDeleteSupported =
                columnNames.includes("estado") && columnNames.includes("fecha_baja");
        }
        catch (error) {
            this.logger.error("[Repository] Failed to resolve soft delete support", error);
            this.softDeleteSupported = false;
        }
        return this.softDeleteSupported;
    }
    async buildAttributes() {
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
    async create(entity) {
        this.logger.info("[Repository] ComponenteRepository.create()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        const payload = {
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
        return ComponenteMapper_1.ComponenteMapper.toDomain(created);
    }
    async update(entity) {
        this.logger.info("[Repository] ComponenteRepository.update()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        const payload = {
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
        return ComponenteMapper_1.ComponenteMapper.toDomain(updated);
    }
    async patch(id_componente, dto) {
        this.logger.info("[Repository] ComponenteRepository.patch()", { id_componente });
        this.logger.debug("[Repository] Patch DTO:", dto);
        // Construimos dinámicamente solo lo que vino
        const updatePayload = {};
        if (dto.id_tipo_componente !== undefined)
            updatePayload.id_tipo_componente = dto.id_tipo_componente;
        if (dto.id_plan !== undefined)
            updatePayload.id_plan = dto.id_plan;
        if (dto.id_tipo_variacion !== undefined)
            updatePayload.id_tipo_variacion = dto.id_tipo_variacion;
        if (dto.nombre !== undefined)
            updatePayload.nombre = dto.nombre;
        if (dto.estado !== undefined)
            updatePayload.estado = dto.estado;
        if (dto.fecha_baja !== undefined)
            updatePayload.fecha_baja = dto.fecha_baja;
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
        return ComponenteMapper_1.ComponenteMapper.toDomain(updated);
    }
    async delete(id_componente) {
        await Models.ComponenteModel.destroy({ where: { id_componente } });
    }
    async softDelete(id_componente, fecha_baja, estado) {
        await Models.ComponenteModel.update({ fecha_baja, estado }, { where: { id_componente } });
    }
    async getById(id) {
        this.logger.info("[Repository] ComponenteRepository.getById(id)");
        const row = await Models.ComponenteModel.findOne({
            where: { id_componente: id, estado: "ACTIVO" },
            include: [
                { model: Models.TipoComponenteModel, as: "tipoComponente", required: false },
                { model: Models.TipoVariacionModel, as: "tipoVariacion", required: false },
                { model: Models.PlanModel, as: "plan", required: false },
            ],
        });
        return row ? ComponenteMapper_1.ComponenteMapper.toDomain(row) : null;
    }
    async getAll() {
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
        return rows.map((r) => ComponenteMapper_1.ComponenteMapper.toDomain(r));
    }
    async getByPlan(id_plan) {
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
        return rows.map((r) => ComponenteMapper_1.ComponenteMapper.toDomain(r));
    }
}
exports.ComponenteRepository = ComponenteRepository;
