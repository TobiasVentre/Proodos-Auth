import { LandingPage } from "@proodos/domain/Entities/LandingPage";

export interface ILandingPageRepository {
  create(landing: LandingPage): Promise<LandingPage>;
  update(landing: LandingPage): Promise<LandingPage>;
  delete(id_landing: number): Promise<void>; 
  getById(id_landing: number): Promise<LandingPage | null>;
  getAll(): Promise<LandingPage[]>; 
}
