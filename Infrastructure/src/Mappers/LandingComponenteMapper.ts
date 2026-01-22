import { LandingComponente } from "@proodos/domain/Entities/LandingComponente";
import { ComponenteModel } from "../Persistence/Models/ComponenteModel";
import { LandingPageModel } from "../Persistence/Models/LandingPageModel";
import { LandingComponenteModel } from "../Persistence/Models/LandingComponenteModel";
import { ComponenteMapper } from "./ComponenteMapper";
import { LandingPageMapper } from "./LandingPageMapper";

export class LandingComponenteMapper {
  static toDomain(model: LandingComponenteModel): LandingComponente {
    const landing = (model as LandingComponenteModel & { landing?: LandingPageModel }).landing;
    const componente = (model as LandingComponenteModel & { componente?: ComponenteModel }).componente;

    return {
      id_landing: model.id_landing,
      id_componente: model.id_componente,
      landing: landing ? LandingPageMapper.toDomain(landing) : undefined,
      componente: componente ? ComponenteMapper.toDomain(componente) : undefined,
    };
  }

  static toPersistence(entity: LandingComponente) {
    return {
      id_landing: entity.id_landing,
      id_componente: entity.id_componente,
    };
  }
}
