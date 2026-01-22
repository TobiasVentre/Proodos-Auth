import { ILandingPageRepository } from "../../Interfaces/ILandingPageRepository";
import { PatchLandingPageDTO } from "../../DTOs/LandingPage/PatchLandingPageDTO";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

const ensureNonEmptyString = (field: string, value: string): string => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${field} must be a non-empty string`);
  }

  return value.trim();
};

export class PatchLandingPageService {
  constructor(private readonly landingPageRepository: ILandingPageRepository) {}

  async execute(id_landing: number, dto: PatchLandingPageDTO): Promise<LandingPage> {
    const existing = await this.landingPageRepository.getById(id_landing);

    if (!existing) {
      throw new Error("LANDING_NOT_FOUND");
    }

    if (Object.keys(dto).length === 0) {
      throw new Error("No fields provided for patch");
    }

    const updated: LandingPage = {
      ...existing,
      URL: dto.URL !== undefined ? ensureNonEmptyString("URL", dto.URL) : existing.URL,
      estado: dto.estado !== undefined ? ensureNonEmptyString("estado", dto.estado) : existing.estado,
      segmento: dto.segmento !== undefined ? ensureNonEmptyString("segmento", dto.segmento) : existing.segmento,
    };

    return this.landingPageRepository.update(updated);
  }
}
