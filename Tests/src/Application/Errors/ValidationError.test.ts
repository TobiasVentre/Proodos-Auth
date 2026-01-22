import { ValidationError } from "@proodos/application/Errors/ValidationError";

describe("ValidationError", () => {
  it("should set name, message, and code", () => {
    // Arrange
    const expectedCode = "VALIDATION_ERROR";
    const expectedMessage = "Plan no existe";

    // Act
    const error = new ValidationError(expectedCode, expectedMessage);

    // Assert
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("ValidationError");
    expect(error.code).toBe(expectedCode);
    expect(error.message).toBe(expectedMessage);
  });
});
