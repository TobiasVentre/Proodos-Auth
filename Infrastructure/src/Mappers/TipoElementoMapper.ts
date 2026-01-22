import { TipoElemento } from "@proodos/domain/Entities/TipoElemento";
import { TipoElementoModel } from "../Persistence/Models/TipoElementoModel";

export class TipoElementoMapper {
  static toDomain(model: TipoElementoModel): TipoElemento {
    return {
      id_tipo_elemento: model.id_tipo_elemento,
      nombre: model.nombre,
    };
  }
}
