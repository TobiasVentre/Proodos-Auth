import { UpdateLandingPageCommand } from "../../DTOs/LandingPage/UpdateLandingPageCommand";
import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { LandingPageMapper } from "./LandingPageMapper";

export class UpdateLandingPageCommandHandler {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(command: UpdateLandingPageCommand): Promise<LandingPage> {
    const landing = LandingPageMapper.fromUpdateCommand(command);

    return await this.landingPageRepository.update(landing);
  }
}
