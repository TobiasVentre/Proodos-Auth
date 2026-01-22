import { sequelize } from "@proodos/infrastructure/Config/SequelizeConfig";
import "@proodos/infrastructure/Persistence/Models";

export const initializeDatabase = async (): Promise<void> => {
  await sequelize.authenticate();

  if (String(process.env.DB_SYNC).toLowerCase() === "true") {
    await sequelize.sync();
  }
};
