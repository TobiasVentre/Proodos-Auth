import { IPlanRepository } from "../../Interfaces/IPlanRepository";
import { ValidationError } from "../../Errors/ValidationError";

export const ensurePlanExists = async (
  planRepository: IPlanRepository,
  id_plan: number
): Promise<void> => {
  const planExists = await planRepository.exists(id_plan);

  if (!planExists) {
    throw new ValidationError("VALIDATION_ERROR", "Plan no existe");
  }
};
