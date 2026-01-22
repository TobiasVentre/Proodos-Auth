import { Plan } from "@proodos/domain/Entities/Plan";
import { PlanModel } from "../Persistence/Models/PlanModel";

export class PlanMapper {
  static toDomain(model: PlanModel): Plan {
    return {
      id_plan: model.id_plan,
      nombre: model.nombre,
      capacidad: Number(model.capacidad),
      capacidad_anterior: Number(model.capacidad_anterior),
      precio_full_price: Number(model.precio_full_price),
      precio_oferta: Number(model.precio_oferta),
      aumento: Number(model.aumento),
      precio_sin_iva: Number(model.precio_sin_iva),
    };
  }
}
