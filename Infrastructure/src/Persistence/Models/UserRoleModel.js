"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleModel = void 0;
const sequelize_1 = require("sequelize");
const SequelizeConfig_1 = require("@proodos/infrastructure/Config/SequelizeConfig");
class UserRoleModel extends sequelize_1.Model {
}
exports.UserRoleModel = UserRoleModel;
UserRoleModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
    },
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: "role_id",
    },
}, {
    sequelize: SequelizeConfig_1.sequelize,
    tableName: "user_roles",
});
