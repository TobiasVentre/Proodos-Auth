"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponenteModel = void 0;
const sequelize_1 = require("sequelize");
class ComponenteModel extends sequelize_1.Model {
    static initModel(sequelize) {
        ComponenteModel.init({
            id_componente: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_tipo_componente: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            id_plan: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            id_tipo_variacion: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
            },
            fecha_creacion: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                // si querés que DB lo haga, lo pondremos en migration.
            },
            estado: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
            fecha_baja: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
        }, {
            sequelize,
            tableName: "componente",
            schema: "dbo",
            timestamps: false,
        });
        return ComponenteModel;
    }
}
exports.ComponenteModel = ComponenteModel;
