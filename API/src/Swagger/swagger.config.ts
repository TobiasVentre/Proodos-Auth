import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { Express } from "express";
import {
  componenteSchemas,
  landingSchemas,
  planSchemas,
  tipoComponenteSchemas,
  tipoVariacionSchemas,
  tipoElementoSchemas,
  elementoComponenteSchemas
} from "./schemas";

export function setupSwagger(app: Express): void {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Proodos API",
        version: "1.0.0",
        description: "Documentación de la API del sistema Proodos"
      },
      components: {
        schemas: {
          ...componenteSchemas,
          ...planSchemas,
          ...landingSchemas,
          ...tipoComponenteSchemas,
          ...tipoVariacionSchemas,
          ...tipoElementoSchemas,
          ...elementoComponenteSchemas
        }
      }
    },
    apis: ["./src/Controllers/*.ts"], 
  };

  const specs = swaggerJsdoc(options);

app.use("/docs", ...swaggerUi.serve, swaggerUi.setup(specs));

}
