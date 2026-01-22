import { CreateLandingPageDTO } from "../DTOs/LandingPage/CreateLandingPageDTO";
import { LandingPage } from "@proodos/domain/Entities/LandingPage";

export interface CreateLandingPageUseCase {
  execute(dto: CreateLandingPageDTO): Promise<LandingPage>;
}

export interface GetAllLandingPagesUseCase {
  execute(): Promise<LandingPage[]>;
}

export interface GetLandingPageByIdUseCase {
  execute(id_landing: number): Promise<LandingPage | null>;
}

export interface UpdateLandingPageUseCase {
  execute(command: {
    id_landing: number;
    URL: string;
    estado: string;
    segmento: string;
  }): Promise<LandingPage>;
}

export interface PatchLandingPageUseCase {
  execute(id_landing: number, dto: { URL?: string; estado?: string; segmento?: string }): Promise<LandingPage>;
}

export interface DeleteLandingPageUseCase {
  execute(id_landing: number): Promise<void>;
}
