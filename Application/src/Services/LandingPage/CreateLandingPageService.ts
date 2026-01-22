import { CreateLandingPageDTO } from "../../DTOs/LandingPage/CreateLandingPageDTO";
import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { CreateLandingPageUseCase } from "../../Ports/LandingPageUseCases";
import { ILogger } from "../../Interfaces/ILogger";

export class CreateLandingPageService implements CreateLandingPageUseCase {
  constructor(
    private readonly landingPageRepository: ILandingPageRepository,
    private readonly logger: ILogger
  ) {}

  async execute(dto: CreateLandingPageDTO): Promise<LandingPage> {
    this.logger.info("[Service] CreateLandingPageService.execute()");
    return await this.landingPageRepository.create(dto as LandingPage);
  }
}
