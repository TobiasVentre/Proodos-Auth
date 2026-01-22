import { Model, DataTypes, Sequelize } from "sequelize";

export class TipoComponenteModel extends Model {
  id_tipo_componente!: number;
  nombre!: string;
  estado!: string;

  static initModel(sequelize: Sequelize) {
    TipoComponenteModel.init(
      {
        id_tipo_componente: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        estado: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "tipo_componente",
        schema: "dbo",
        timestamps: false,
      }
    );
    return TipoComponenteModel;
  }
}
