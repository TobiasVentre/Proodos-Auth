import { Model, DataTypes, Sequelize } from "sequelize";

export class LandingComponenteModel extends Model {
  id_landing!: number;
  id_componente!: number;

  static initModel(sequelize: Sequelize) {
    LandingComponenteModel.init(
      {
        id_landing: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
        id_componente: {
          type: DataTypes.INTEGER,
          primaryKey: true,
        },
      },
      {
        sequelize,
        tableName: "landing_componente",
        schema: "dbo",
        timestamps: false,
      }
    );
    return LandingComponenteModel;
  }
}
