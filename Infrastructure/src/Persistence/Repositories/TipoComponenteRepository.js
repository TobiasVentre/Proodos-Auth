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
exports.TipoComponenteRepository = void 0;
const Models = __importStar(require("../Models"));
const TipoComponenteMapper_1 = require("../../Mappers/TipoComponenteMapper");
class TipoComponenteRepository {
    constructor(logger) {
        this.logger = logger;
    }
    async create(entity) {
        this.logger.info("[Repository] TipoComponenteRepository.create()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        const created = await Models.TipoComponenteModel.create({
            nombre: entity.nombre,
            estado: entity.estado,
        });
        return TipoComponenteMapper_1.TipoComponenteMapper.toDomain(created);
    }
    async update(entity) {
        this.logger.info("[Repository] TipoComponenteRepository.update()");
        this.logger.debug("[Repository] Datos recibidos:", entity);
        await Models.TipoComponenteModel.update({
            nombre: entity.nombre,
            estado: entity.estado,
        }, { where: { id_tipo_componente: entity.id_tipo_componente } });
        const updated = await Models.TipoComponenteModel.findByPk(entity.id_tipo_componente);
        if (!updated) {
            throw new Error(`TipoComponente not found: id_tipo_componente=${entity.id_tipo_componente}`);
        }
        return TipoComponenteMapper_1.TipoComponenteMapper.toDomain(updated);
    }
    async patch(id_tipo_componente, dto) {
        this.logger.info("[Repository] TipoComponenteRepository.patch()", {
            id_tipo_componente,
        });
        this.logger.debug("[Repository] Patch DTO:", dto);
        const updatePayload = {};
        if (dto.nombre !== undefined)
            updatePayload.nombre = dto.nombre;
        if (dto.estado !== undefined)
            updatePayload.estado = dto.estado;
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
        return TipoComponenteMapper_1.TipoComponenteMapper.toDomain(updated);
    }
    async getById(id_tipo_componente) {
        this.logger.info("[Repository] TipoComponenteRepository.getById()");
        const row = await Models.TipoComponenteModel.findByPk(id_tipo_componente);
        return row ? TipoComponenteMapper_1.TipoComponenteMapper.toDomain(row) : null;
    }
    async getAll() {
        this.logger.info("[Repository] TipoComponenteRepository.getAll()");
        const rows = await Models.TipoComponenteModel.findAll({
            order: [["id_tipo_componente", "DESC"]],
        });
        return rows.map((row) => TipoComponenteMapper_1.TipoComponenteMapper.toDomain(row));
    }
    async exists(id_tipo_componente) {
        this.logger.info("[Repository] TipoComponenteRepository.exists()");
        const count = await Models.TipoComponenteModel.count({
            where: { id_tipo_componente },
        });
        return count > 0;
    }
}
exports.TipoComponenteRepository = TipoComponenteRepository;
