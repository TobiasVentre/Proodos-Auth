import { ITipoComponenteRepository } from "../../Interfaces/ITipoComponenteRepository";

export const ensureTipoComponenteExists = async (
  tipoComponenteRepository: ITipoComponenteRepository,
  id_tipo_componente: number
) => {
  const exists = await tipoComponenteRepository.exists(id_tipo_componente);
  if (!exists) {
    throw new Error("TIPO_COMPONENTE_NOT_FOUND");
  }
};
