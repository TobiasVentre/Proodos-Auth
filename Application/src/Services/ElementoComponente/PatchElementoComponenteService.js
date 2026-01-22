"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatchElementoComponenteService = void 0;
class PatchElementoComponenteService {
    constructor(elementoComponenteRepository, componenteRepository, tipoElementoRepository) {
        this.elementoComponenteRepository = elementoComponenteRepository;
        this.componenteRepository = componenteRepository;
        this.tipoElementoRepository = tipoElementoRepository;
    }
    async execute(id_elemento, dto) {
        if (dto.id_componente !== undefined) {
            const componente = await this.componenteRepository.getById(dto.id_componente);
            if (!componente) {
                throw new Error("COMPONENTE_NOT_FOUND");
            }
        }
        if (dto.id_tipo_elemento !== undefined) {
            const tipoElementoExists = await this.tipoElementoRepository.exists(dto.id_tipo_elemento);
            if (!tipoElementoExists) {
                throw new Error("TIPO_ELEMENTO_NOT_FOUND");
            }
        }
        return this.elementoComponenteRepository.patch(id_elemento, dto);
    }
}
exports.PatchElementoComponenteService = PatchElementoComponenteService;
