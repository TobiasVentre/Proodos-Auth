"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoElementoModel = void 0;
const sequelize_1 = require("sequelize");
class TipoElementoModel extends sequelize_1.Model {
    static initModel(sequelize) {
        TipoElementoModel.init({
            id_tipo_elemento: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: "tipo_elemento",
            schema: "dbo",
            timestamps: false,
        });
        return TipoElementoModel;
    }
}
exports.TipoElementoModel = TipoElementoModel;
