import { Model, DataTypes, Sequelize } from "sequelize";

export class TipoElementoModel extends Model {
  id_tipo_elemento!: number;
  nombre!: string;

  static initModel(sequelize: Sequelize) {
    TipoElementoModel.init(
      {
        id_tipo_elemento: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "tipo_elemento",
        schema: "dbo",
        timestamps: false,
      }
    );
    return TipoElementoModel;
  }
}
