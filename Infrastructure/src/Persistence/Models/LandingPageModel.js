"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LandingPageModel = void 0;
const sequelize_1 = require("sequelize");
class LandingPageModel extends sequelize_1.Model {
    static initModel(sequelize) {
        LandingPageModel.init({
            id_landing: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            URL: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: false,
            },
            estado: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
            segmento: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: "landing_page",
            schema: "dbo",
            timestamps: false,
        });
        return LandingPageModel;
    }
}
exports.LandingPageModel = LandingPageModel;
