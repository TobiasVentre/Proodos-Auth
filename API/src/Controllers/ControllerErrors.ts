import { Response } from "express";
import { ValidationError } from "@proodos/application/Errors/ValidationError";

type ValidationErrorDetails = Record<string, unknown>;

export const respondValidationError = (
  res: Response,
  message: string,
  details?: ValidationErrorDetails
) =>
  res.status(400).json({
    error: true,
    code: "VALIDATION_ERROR",
    message,
    ...details,
  });

export const handleControllerError = (res: Response, error: unknown) => {
  if (error instanceof ValidationError) {
    return res.status(400).json({
      error: true,
      code: error.code,
      message: error.message,
    });
  }

  return res.status(500).json({ error: "Internal server error" });
};
