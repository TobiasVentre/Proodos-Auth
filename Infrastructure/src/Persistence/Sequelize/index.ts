import { sequelize } from "@proodos/infrastructure/Config/SequelizeConfig";
import "@proodos/infrastructure/Persistence/Models";

export const initializeDatabase = async (): Promise<void> => {
  await sequelize.authenticate();

  const allowSync = String(process.env.DB_SYNC).toLowerCase() === "true";
  const isProduction = String(process.env.NODE_ENV).toLowerCase() === "production";
  if (allowSync && !isProduction) {
    await sequelize.sync();
  }
};
