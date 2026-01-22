"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const sequelize_1 = require("sequelize");
const SequelizeConfig_1 = require("@proodos/infrastructure/Config/SequelizeConfig");
class RoleModel extends sequelize_1.Model {
}
exports.RoleModel = RoleModel;
RoleModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    sequelize: SequelizeConfig_1.sequelize,
    tableName: "roles",
});
