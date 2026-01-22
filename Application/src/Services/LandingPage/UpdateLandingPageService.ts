import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { UpdateLandingPageCommand } from "../../DTOs/LandingPage/UpdateLandingPageCommand";
import { LandingPageMapper } from "./LandingPageMapper";

export class UpdateLandingPageService {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(command: UpdateLandingPageCommand): Promise<LandingPage> {
    const landing = LandingPageMapper.fromUpdateCommand(command);

    return await this.landingPageRepository.update(landing);
  }
}
