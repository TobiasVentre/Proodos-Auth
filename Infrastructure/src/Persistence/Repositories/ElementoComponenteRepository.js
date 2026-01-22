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
exports.ElementoComponenteRepository = void 0;
const Models = __importStar(require("../Models"));
const ElementoComponenteMapper_1 = require("../../Mappers/ElementoComponenteMapper");
class ElementoComponenteRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async create(entity) {
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
        return ElementoComponenteMapper_1.ElementoComponenteMapper.toDomain(created);
    }
    async update(entity) {
        this.logger.info("[Repository] ElementoComponenteRepository.update()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        await Models.ElementoComponenteModel.update({
            id_componente: entity.id_componente,
            id_tipo_elemento: entity.id_tipo_elemento,
            nombre: entity.nombre,
            icono_img: entity.icono_img,
            descripcion: entity.descripcion,
            link: entity.link,
            orden: entity.orden,
            css_url: entity.css_url,
        }, { where: { id_elemento: entity.id_elemento } });
        const updated = await Models.ElementoComponenteModel.findByPk(entity.id_elemento);
        if (!updated) {
            throw new Error(`ElementoComponente not found: id_elemento=${entity.id_elemento}`);
        }
        return ElementoComponenteMapper_1.ElementoComponenteMapper.toDomain(updated);
    }
    async patch(id_elemento, dto) {
        this.logger.info("[Repository] ElementoComponenteRepository.patch()", {
            id_elemento,
        });
        this.logger.debug("[Repository] Patch DTO:", dto);
        const updatePayload = {};
        if (dto.id_componente !== undefined) {
            updatePayload.id_componente = dto.id_componente;
        }
        if (dto.id_tipo_elemento !== undefined) {
            updatePayload.id_tipo_elemento = dto.id_tipo_elemento;
        }
        if (dto.nombre !== undefined)
            updatePayload.nombre = dto.nombre;
        if (dto.icono_img !== undefined)
            updatePayload.icono_img = dto.icono_img;
        if (dto.descripcion !== undefined)
            updatePayload.descripcion = dto.descripcion;
        if (dto.link !== undefined)
            updatePayload.link = dto.link;
        if (dto.orden !== undefined)
            updatePayload.orden = dto.orden;
        if (dto.css_url !== undefined)
            updatePayload.css_url = dto.css_url;
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
        return ElementoComponenteMapper_1.ElementoComponenteMapper.toDomain(updated);
    }
    async getById(id_elemento) {
        this.logger.info("[Repository] ElementoComponenteRepository.getById()");
        const row = await Models.ElementoComponenteModel.findByPk(id_elemento);
        return row ? ElementoComponenteMapper_1.ElementoComponenteMapper.toDomain(row) : null;
    }
    async getAll() {
        this.logger.info("[Repository] ElementoComponenteRepository.getAll()");
        const rows = await Models.ElementoComponenteModel.findAll({
            order: [["id_elemento", "DESC"]],
        });
        return rows.map((row) => ElementoComponenteMapper_1.ElementoComponenteMapper.toDomain(row));
    }
    async getByComponente(id_componente) {
        this.logger.info("[Repository] ElementoComponenteRepository.getByComponente()", {
            id_componente,
        });
        const rows = await Models.ElementoComponenteModel.findAll({
            where: { id_componente },
            order: [["orden", "ASC"]],
        });
        return rows.map((row) => ElementoComponenteMapper_1.ElementoComponenteMapper.toDomain(row));
    }
    async delete(id_elemento) {
        this.logger.info("[Repository] ElementoComponenteRepository.delete()", {
            id_elemento,
        });
        await Models.ElementoComponenteModel.destroy({ where: { id_elemento } });
    }
}
exports.ElementoComponenteRepository = ElementoComponenteRepository;
