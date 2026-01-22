"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoComponenteModel = void 0;
const sequelize_1 = require("sequelize");
class TipoComponenteModel extends sequelize_1.Model {
    static initModel(sequelize) {
        TipoComponenteModel.init({
            id_tipo_componente: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
            estado: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: "tipo_componente",
            schema: "dbo",
            timestamps: false,
        });
        return TipoComponenteModel;
    }
}
exports.TipoComponenteModel = TipoComponenteModel;
