"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensurePlanExists = void 0;
const ValidationError_1 = require("../../Errors/ValidationError");
const ensurePlanExists = async (planRepository, id_plan) => {
    const planExists = await planRepository.exists(id_plan);
    if (!planExists) {
        throw new ValidationError_1.ValidationError("VALIDATION_ERROR", "Plan no existe");
    }
};
exports.ensurePlanExists = ensurePlanExists;
