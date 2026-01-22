import { Plan } from "@proodos/domain/Entities/Plan";
import { PatchPlanDTO } from "../DTOs/Plan/PatchPlanDTO";

export interface IPlanRepository {
  create(plan: Plan): Promise<Plan>;
  update(plan: Plan): Promise<Plan>;
  patch(id_plan: number, dto: PatchPlanDTO): Promise<Plan>;
  getById(id_plan: number): Promise<Plan | null>;
  getAll(): Promise<Plan[]>;
  exists(id_plan: number): Promise<boolean>;
}
