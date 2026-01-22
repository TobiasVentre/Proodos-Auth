const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

// Debug mínimo (dejalo hasta que conecte)
const server = process.env.DB_HOST;
console.log("[sequelize.config.js] DB_HOST =", server);

const common = {
  dialect: "mssql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 1433),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false,
  dialectOptions: {
    options: {
      // esto evita el error de "config.server" en tedious
      server: process.env.DB_HOST,
      encrypt: String(process.env.DB_ENCRYPT).toLowerCase() === "true",
      trustServerCertificate: String(process.env.DB_TRUST_CERT).toLowerCase() !== "false"
    }
  }
};

module.exports = {
  development: common,
  test: common,
  production: common
};
