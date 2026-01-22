import { ILogger } from "@proodos/application/Interfaces/ILogger";

export class ConsoleLogger implements ILogger {
  info(message: string, meta?: unknown): void {
    console.log(message, meta ?? "");
  }

  warn(message: string, meta?: unknown): void {
    console.warn(message, meta ?? "");
  }

  error(message: string, meta?: unknown): void {
    console.error(message, meta ?? "");
  }

  debug(message: string, meta?: unknown): void {
    console.debug(message, meta ?? "");
  }
}
