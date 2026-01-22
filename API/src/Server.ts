import { loadEnv } from "./Config/loadEnv";

loadEnv();

import express from "express";
import { setupSwagger } from "./Swagger/swagger.config";
import { buildRoutes } from "./Routes/routes";
import { ConsoleLogger } from "./Logging/ConsoleLogger";

const app = express();
const logger = new ConsoleLogger();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.use((err: unknown, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }
  return next(err);
});

setupSwagger(app);

const startServer = async () => {
  app.use("/api", await buildRoutes(logger));

  const PORT = Number(process.env.PORT || 3030);
  app.listen(PORT, () => {
    logger.info(`API Running on http://localhost:${PORT}/docs`);
  });
};

startServer();
