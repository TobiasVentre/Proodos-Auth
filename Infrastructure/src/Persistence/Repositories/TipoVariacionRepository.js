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
exports.TipoVariacionRepository = void 0;
const Models = __importStar(require("../Models"));
const TipoVariacionMapper_1 = require("../../Mappers/TipoVariacionMapper");
class TipoVariacionRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async create(entity) {
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
        return TipoVariacionMapper_1.TipoVariacionMapper.toDomain(created);
    }
    async update(entity) {
        this.logger.info("[Repository] TipoVariacionRepository.update()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        await Models.TipoVariacionModel.update({
            id_tipo_componente: entity.id_tipo_componente,
            nombre: entity.nombre,
            descripcion: entity.descripcion,
            css_url: entity.css_url,
            js_url: entity.js_url,
            html: entity.html,
        }, { where: { id_tipo_variacion: entity.id_tipo_variacion } });
        const updated = await Models.TipoVariacionModel.findByPk(entity.id_tipo_variacion);
        if (!updated) {
            throw new Error(`TipoVariacion not found: id_tipo_variacion=${entity.id_tipo_variacion}`);
        }
        return TipoVariacionMapper_1.TipoVariacionMapper.toDomain(updated);
    }
    async patch(id_tipo_variacion, dto) {
        this.logger.info("[Repository] TipoVariacionRepository.patch()", {
            id_tipo_variacion,
        });
        this.logger.debug("[Repository] Patch DTO:", dto);
        const updatePayload = {};
        if (dto.id_tipo_componente !== undefined) {
            updatePayload.id_tipo_componente = dto.id_tipo_componente;
        }
        if (dto.nombre !== undefined)
            updatePayload.nombre = dto.nombre;
        if (dto.descripcion !== undefined)
            updatePayload.descripcion = dto.descripcion;
        if (dto.css_url !== undefined)
            updatePayload.css_url = dto.css_url;
        if (dto.js_url !== undefined)
            updatePayload.js_url = dto.js_url;
        if (dto.html !== undefined)
            updatePayload.html = dto.html;
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
        return TipoVariacionMapper_1.TipoVariacionMapper.toDomain(updated);
    }
    async getById(id_tipo_variacion) {
        this.logger.info("[Repository] TipoVariacionRepository.getById()");
        const row = await Models.TipoVariacionModel.findByPk(id_tipo_variacion);
        return row ? TipoVariacionMapper_1.TipoVariacionMapper.toDomain(row) : null;
    }
    async getAll() {
        this.logger.info("[Repository] TipoVariacionRepository.getAll()");
        const rows = await Models.TipoVariacionModel.findAll({
            order: [["id_tipo_variacion", "DESC"]],
        });
        return rows.map((row) => TipoVariacionMapper_1.TipoVariacionMapper.toDomain(row));
    }
    async getByTipoComponente(id_tipo_componente) {
        this.logger.info("[Repository] TipoVariacionRepository.getByTipoComponente()", {
            id_tipo_componente,
        });
        const rows = await Models.TipoVariacionModel.findAll({
            where: { id_tipo_componente },
            order: [["id_tipo_variacion", "DESC"]],
        });
        return rows.map((row) => TipoVariacionMapper_1.TipoVariacionMapper.toDomain(row));
    }
}
exports.TipoVariacionRepository = TipoVariacionRepository;
