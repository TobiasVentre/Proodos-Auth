import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";
import { GetLandingPageByIdUseCase } from "../../Ports/LandingPageUseCases";
import { ILogger } from "../../Interfaces/ILogger";

export class GetLandingPageByIdService implements GetLandingPageByIdUseCase {
  constructor(
    private readonly landingPageRepository: ILandingPageRepository,
    private readonly logger: ILogger
  ) {}

  async execute(id_landing: number): Promise<LandingPage | null> {
    this.logger.info("[Service] GetLandingPageByIdService.execute()", { id_landing });
    return await this.landingPageRepository.getById(id_landing);
  }
}
