import { TipoVariacion } from "@proodos/domain/Entities/TipoVariacion";
import { TipoVariacionModel } from "../Persistence/Models/TipoVariacionModel";

export class TipoVariacionMapper {
  static toDomain(model: TipoVariacionModel): TipoVariacion {
    return {
      id_tipo_variacion: model.id_tipo_variacion,
      id_tipo_componente: model.id_tipo_componente,
      nombre: model.nombre,
      descripcion: model.descripcion,
      css_url: model.css_url,
      js_url: model.js_url,
      html: model.html,
    };
  }
}
