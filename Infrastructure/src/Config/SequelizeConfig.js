"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
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
});
