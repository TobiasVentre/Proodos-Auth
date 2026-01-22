import { ensurePlanExists } from "@proodos/application/Services/Componente/ensurePlanExists";
import { ValidationError } from "@proodos/application/Errors/ValidationError";
import { IPlanRepository } from "@proodos/application/Interfaces/IPlanRepository";

describe("ensurePlanExists", () => {
  it("should throw a ValidationError when the plan does not exist", async () => {
    // Arrange
    const planRepository: IPlanRepository = {
      create: jest.fn(),
      update: jest.fn(),
      patch: jest.fn(),
      getById: jest.fn(),
      getAll: jest.fn(),
      exists: jest.fn().mockResolvedValue(false)
    };

    // Act
    const action = () => ensurePlanExists(planRepository, 10);

    // Assert
    await expect(action()).rejects.toBeInstanceOf(ValidationError);
    await expect(action()).rejects.toMatchObject({
      code: "VALIDATION_ERROR",
      message: "Plan no existe"
    });
  });

  it("should resolve when the plan exists", async () => {
    // Arrange
    const planRepository: IPlanRepository = {
      create: jest.fn(),
      update: jest.fn(),
      patch: jest.fn(),
      getById: jest.fn(),
      getAll: jest.fn(),
      exists: jest.fn().mockResolvedValue(true)
    };

    // Act
    const action = () => ensurePlanExists(planRepository, 10);

    // Assert
    await expect(action()).resolves.toBeUndefined();
  });
});
