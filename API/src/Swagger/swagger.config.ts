import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";
import { authSchemas, roleSchemas } from "./schemas";

export function setupSwagger(app: Express): void {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Proodos Auth API",
        version: "1.0.0",
        description: "Microservicio de autenticación y roles",
      },
      components: {
        schemas: {
          ...authSchemas,
          ...roleSchemas,
        },
      },
    },
    apis: ["./src/Controllers/*.ts"],
  };

  const specs = swaggerJsdoc(options);

  app.use("/docs", ...swaggerUi.serve, swaggerUi.setup(specs));
}
