import { DeleteLandingPageCommand } from "../../DTOs/LandingPage/DeleteLandingPageCommand";
import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";

export class DeleteLandingPageCommandHandler {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(command: DeleteLandingPageCommand): Promise<void> {
    await this.landingPageRepository.delete(command.id_landing);
  }
}
