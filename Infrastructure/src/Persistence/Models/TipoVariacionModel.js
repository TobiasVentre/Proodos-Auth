"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoVariacionModel = void 0;
const sequelize_1 = require("sequelize");
class TipoVariacionModel extends sequelize_1.Model {
    static initModel(sequelize) {
        TipoVariacionModel.init({
            id_tipo_variacion: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_tipo_componente: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
            descripcion: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: true,
            },
            css_url: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: true,
            },
            js_url: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: true,
            },
            html: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
        }, {
            sequelize,
            tableName: "tipo_variacion",
            schema: "dbo",
            timestamps: false,
        });
        return TipoVariacionModel;
    }
}
exports.TipoVariacionModel = TipoVariacionModel;
