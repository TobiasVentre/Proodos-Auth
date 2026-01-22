"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = void 0;
const SequelizeConfig_1 = require("@proodos/infrastructure/Config/SequelizeConfig");
require("@proodos/infrastructure/Persistence/Models");
const initializeDatabase = async () => {
    await SequelizeConfig_1.sequelize.authenticate();
    if (String(process.env.DB_SYNC).toLowerCase() === "true") {
        await SequelizeConfig_1.sequelize.sync();
    }
};
exports.initializeDatabase = initializeDatabase;
