"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanModel = void 0;
const sequelize_1 = require("sequelize");
class PlanModel extends sequelize_1.Model {
    static initModel(sequelize) {
        PlanModel.init({
            id_plan: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
            },
            capacidad: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            capacidad_anterior: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            precio_full_price: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            precio_oferta: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            aumento: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            precio_sin_iva: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: "plan",
            schema: "dbo",
            timestamps: false,
        });
        return PlanModel;
    }
}
exports.PlanModel = PlanModel;
