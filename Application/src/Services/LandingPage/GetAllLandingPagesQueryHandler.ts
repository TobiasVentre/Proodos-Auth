import { GetAllLandingPagesQuery } from "../../DTOs/LandingPage/GetAllLandingPagesQuery";
import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

export class GetAllLandingPagesQueryHandler {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(_query: GetAllLandingPagesQuery): Promise<LandingPage[]> {
    return await this.landingPageRepository.getAll();
  }
}
