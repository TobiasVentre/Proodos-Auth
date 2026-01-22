import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";

export class DeleteLandingPageService {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(id_landing: number): Promise<void> {
    await this.landingPageRepository.delete(id_landing);
  }
}
