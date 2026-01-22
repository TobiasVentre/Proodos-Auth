import { ILogger } from "@proodos/application/Interfaces/ILogger";

export class ConsoleLogger implements ILogger {
  info(message: string, meta?: Record<string, unknown>): void {
    console.log(`[INFO] ${message}`, meta ?? "");
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    console.warn(`[WARN] ${message}`, meta ?? "");
  }

  error(message: string, meta?: Record<string, unknown>): void {
    console.error(`[ERROR] ${message}`, meta ?? "");
  }
}
