import { Componente } from "@proodos/domain/Entities/Componente";
import { PlanModel } from "../Persistence/Models/PlanModel";
import { ComponenteModel } from "../Persistence/Models/ComponenteModel";
import { PlanMapper } from "./PlanMapper";

export class ComponenteMapper {
  static toDomain(model: ComponenteModel): Componente {
    const plan = (model as ComponenteModel & { plan?: PlanModel }).plan;

    return {
      id_componente: model.id_componente,
      id_tipo_componente: model.id_tipo_componente,
      id_plan: model.id_plan,
      id_tipo_variacion: model.id_tipo_variacion,
      nombre: model.nombre,
      fecha_creacion: model.fecha_creacion,
      estado: model.estado,
      fecha_baja: model.fecha_baja,
      plan: plan ? PlanMapper.toDomain(plan) : undefined,
    };
  }
}
