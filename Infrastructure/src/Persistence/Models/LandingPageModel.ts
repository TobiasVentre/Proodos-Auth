import { Model, DataTypes, Sequelize } from "sequelize";

export class LandingPageModel extends Model {
  id_landing!: number;
  URL!: string;
  estado!: string;
  segmento!: string;

  static initModel(sequelize: Sequelize) {
    LandingPageModel.init(
      {
        id_landing: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        URL: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        estado: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        segmento: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "landing_page",
        schema: "dbo",
        timestamps: false,
      }
    );
    return LandingPageModel;
  }
}
