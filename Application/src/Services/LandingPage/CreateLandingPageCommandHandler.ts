import { CreateLandingPageCommand } from "../../DTOs/LandingPage/CreateLandingPageCommand";
import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { LandingPageMapper } from "./LandingPageMapper";

export class CreateLandingPageCommandHandler {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(command: CreateLandingPageCommand): Promise<LandingPage> {
    const landing = LandingPageMapper.fromCreateCommand(command);

    return await this.landingPageRepository.create(landing);
  }
}
