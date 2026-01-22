"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingComponenteModel = void 0;
const sequelize_1 = require("sequelize");
class LandingComponenteModel extends sequelize_1.Model {
    static initModel(sequelize) {
        LandingComponenteModel.init({
            id_landing: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
            },
            id_componente: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
            },
        }, {
            sequelize,
            tableName: "landing_componente",
            schema: "dbo",
            timestamps: false,
        });
        return LandingComponenteModel;
    }
}
exports.LandingComponenteModel = LandingComponenteModel;
