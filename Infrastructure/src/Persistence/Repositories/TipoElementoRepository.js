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
exports.TipoElementoRepository = void 0;
const Models = __importStar(require("../Models"));
const TipoElementoMapper_1 = require("../../Mappers/TipoElementoMapper");
class TipoElementoRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async create(entity) {
        this.logger.info("[Repository] TipoElementoRepository.create()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        const created = await Models.TipoElementoModel.create({
            nombre: entity.nombre,
        });
        return TipoElementoMapper_1.TipoElementoMapper.toDomain(created);
    }
    async update(entity) {
        this.logger.info("[Repository] TipoElementoRepository.update()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        await Models.TipoElementoModel.update({
            nombre: entity.nombre,
        }, { where: { id_tipo_elemento: entity.id_tipo_elemento } });
        const updated = await Models.TipoElementoModel.findByPk(entity.id_tipo_elemento);
        if (!updated) {
            throw new Error(`TipoElemento not found: id_tipo_elemento=${entity.id_tipo_elemento}`);
        }
        return TipoElementoMapper_1.TipoElementoMapper.toDomain(updated);
    }
    async patch(id_tipo_elemento, dto) {
        this.logger.info("[Repository] TipoElementoRepository.patch()", {
            id_tipo_elemento,
        });
        this.logger.debug("[Repository] Patch DTO:", dto);
        const updatePayload = {};
        if (dto.nombre !== undefined)
            updatePayload.nombre = dto.nombre;
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
        return TipoElementoMapper_1.TipoElementoMapper.toDomain(updated);
    }
    async getById(id_tipo_elemento) {
        this.logger.info("[Repository] TipoElementoRepository.getById()");
        const row = await Models.TipoElementoModel.findByPk(id_tipo_elemento);
        return row ? TipoElementoMapper_1.TipoElementoMapper.toDomain(row) : null;
    }
    async getAll() {
        this.logger.info("[Repository] TipoElementoRepository.getAll()");
        const rows = await Models.TipoElementoModel.findAll({
            order: [["id_tipo_elemento", "DESC"]],
        });
        return rows.map((row) => TipoElementoMapper_1.TipoElementoMapper.toDomain(row));
    }
    async delete(id_tipo_elemento) {
        this.logger.info("[Repository] TipoElementoRepository.delete()", {
            id_tipo_elemento,
        });
        await Models.TipoElementoModel.destroy({ where: { id_tipo_elemento } });
    }
    async exists(id_tipo_elemento) {
        this.logger.info("[Repository] TipoElementoRepository.exists()");
        const count = await Models.TipoElementoModel.count({
            where: { id_tipo_elemento },
        });
        return count > 0;
    }
}
exports.TipoElementoRepository = TipoElementoRepository;
