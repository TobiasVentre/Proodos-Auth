import { TipoComponente } from "@proodos/domain/Entities/TipoComponente";
import { TipoComponenteModel } from "../Persistence/Models/TipoComponenteModel";

export class TipoComponenteMapper {
  static toDomain(model: TipoComponenteModel): TipoComponente {
    return {
      id_tipo_componente: model.id_tipo_componente,
      nombre: model.nombre,
      estado: model.estado,
    };
  }
}
