import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { LandingPageModel } from "../Persistence/Models/LandingPageModel";

export class LandingPageMapper {
  static toDomain(model: LandingPageModel): LandingPage {
    return {
      id_landing: model.id_landing,
      URL: model.URL,
      estado: model.estado,
      segmento: model.segmento,
    };
  }
}
