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
exports.PlanRepository = void 0;
const Models = __importStar(require("../Models"));
const PlanMapper_1 = require("../../Mappers/PlanMapper");
class PlanRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async create(entity) {
        this.logger.info("[Repository] PlanRepository.create()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        const created = await Models.PlanModel.create({
            nombre: entity.nombre,
            capacidad: entity.capacidad,
            capacidad_anterior: entity.capacidad_anterior,
            precio_full_price: entity.precio_full_price,
            precio_oferta: entity.precio_oferta,
            aumento: entity.aumento,
            precio_sin_iva: entity.precio_sin_iva,
        });
        return PlanMapper_1.PlanMapper.toDomain(created);
    }
    async update(entity) {
        this.logger.info("[Repository] PlanRepository.update()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        await Models.PlanModel.update({
            nombre: entity.nombre,
            capacidad: entity.capacidad,
            capacidad_anterior: entity.capacidad_anterior,
            precio_full_price: entity.precio_full_price,
            precio_oferta: entity.precio_oferta,
            aumento: entity.aumento,
            precio_sin_iva: entity.precio_sin_iva,
        }, { where: { id_plan: entity.id_plan } });
        const updated = await Models.PlanModel.findByPk(entity.id_plan);
        if (!updated) {
            throw new Error(`Plan not found: id_plan=${entity.id_plan}`);
        }
        return PlanMapper_1.PlanMapper.toDomain(updated);
    }
    async patch(id_plan, dto) {
        this.logger.info("[Repository] PlanRepository.patch()", { id_plan });
        this.logger.debug("[Repository] Patch DTO:", dto);
        const updatePayload = {};
        if (dto.nombre !== undefined)
            updatePayload.nombre = dto.nombre;
        if (dto.capacidad !== undefined)
            updatePayload.capacidad = dto.capacidad;
        if (dto.capacidad_anterior !== undefined) {
            updatePayload.capacidad_anterior = dto.capacidad_anterior;
        }
        if (dto.precio_full_price !== undefined) {
            updatePayload.precio_full_price = dto.precio_full_price;
        }
        if (dto.precio_oferta !== undefined) {
            updatePayload.precio_oferta = dto.precio_oferta;
        }
        if (dto.aumento !== undefined)
            updatePayload.aumento = dto.aumento;
        if (dto.precio_sin_iva !== undefined) {
            updatePayload.precio_sin_iva = dto.precio_sin_iva;
        }
        if (Object.keys(updatePayload).length === 0) {
            throw new Error("No fields provided for patch");
        }
        await Models.PlanModel.update(updatePayload, {
            where: { id_plan },
        });
        const updated = await Models.PlanModel.findByPk(id_plan);
        if (!updated) {
            throw new Error(`Plan not found: id_plan=${id_plan}`);
        }
        return PlanMapper_1.PlanMapper.toDomain(updated);
    }
    async getById(id_plan) {
        this.logger.info("[Repository] PlanRepository.getById(id)");
        const row = await Models.PlanModel.findByPk(id_plan);
        return row ? PlanMapper_1.PlanMapper.toDomain(row) : null;
    }
    async getAll() {
        this.logger.info("[Repository] PlanRepository.getAll()");
        const rows = await Models.PlanModel.findAll({
            order: [["id_plan", "DESC"]],
        });
        return rows.map((row) => PlanMapper_1.PlanMapper.toDomain(row));
    }
    async exists(id_plan) {
        this.logger.info("[Repository] PlanRepository.exists()");
        const count = await Models.PlanModel.count({ where: { id_plan } });
        return count > 0;
    }
}
exports.PlanRepository = PlanRepository;
