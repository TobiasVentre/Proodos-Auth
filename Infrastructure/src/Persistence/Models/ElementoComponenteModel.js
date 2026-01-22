"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementoComponenteModel = void 0;
const sequelize_1 = require("sequelize");
class ElementoComponenteModel extends sequelize_1.Model {
    static initModel(sequelize) {
        ElementoComponenteModel.init({
            id_elemento: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_componente: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            id_tipo_elemento: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            nombre: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
            icono_img: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: false,
            },
            descripcion: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            link: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: false,
            },
            orden: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            css_url: {
                type: sequelize_1.DataTypes.STRING(500),
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: "elemento_componente",
            schema: "dbo",
            timestamps: false,
        });
        return ElementoComponenteModel;
    }
}
exports.ElementoComponenteModel = ElementoComponenteModel;
