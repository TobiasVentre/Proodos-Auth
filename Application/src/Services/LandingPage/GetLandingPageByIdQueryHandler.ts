import { GetLandingPageByIdQuery } from "../../DTOs/LandingPage/GetLandingPageByIdQuery";
import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

export class GetLandingPageByIdQueryHandler {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(query: GetLandingPageByIdQuery): Promise<LandingPage | null> {
    return await this.landingPageRepository.getById(query.id_landing);
  }
}
