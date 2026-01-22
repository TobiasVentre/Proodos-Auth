import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    dialect: "mssql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 1433),
    logging: false,
    dialectOptions: {
      options: {
        encrypt: String(process.env.DB_ENCRYPT).toLowerCase() === "true",
        trustServerCertificate: String(process.env.DB_TRUST_CERT).toLowerCase() !== "false",
      },
    },
  }
);
