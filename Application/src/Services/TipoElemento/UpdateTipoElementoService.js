"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTipoElementoService = void 0;
const TipoElementoDTOMapper_1 = require("../../DTOs/TipoElemento/TipoElementoDTOMapper");
class UpdateTipoElementoService {
    constructor(tipoElementoRepository) {
        this.tipoElementoRepository = tipoElementoRepository;
    }
    async execute(dto) {
        const entity = (0, TipoElementoDTOMapper_1.mapUpdateTipoElementoDTOToEntity)(dto);
        return this.tipoElementoRepository.update(entity);
    }
}
exports.UpdateTipoElementoService = UpdateTipoElementoService;
