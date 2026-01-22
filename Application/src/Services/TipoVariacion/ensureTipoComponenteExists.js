"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureTipoComponenteExists = void 0;
const ensureTipoComponenteExists = async (tipoComponenteRepository, id_tipo_componente) => {
    const exists = await tipoComponenteRepository.exists(id_tipo_componente);
    if (!exists) {
        throw new Error("TIPO_COMPONENTE_NOT_FOUND");
    }
};
exports.ensureTipoComponenteExists = ensureTipoComponenteExists;
