import { Model, DataTypes, Sequelize } from "sequelize";

export class TipoVariacionModel extends Model {
  id_tipo_variacion!: number;
  id_tipo_componente!: number;
  nombre!: string;
  descripcion!: string;
  css_url!: string;
  js_url!: string;
  html!: string;

  static initModel(sequelize: Sequelize) {
    TipoVariacionModel.init(
      {
        id_tipo_variacion: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_tipo_componente: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        descripcion: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        css_url: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        js_url: {
          type: DataTypes.STRING(500),
          allowNull: true,
        },
        html: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "tipo_variacion",
        schema: "dbo",
        timestamps: false,
      }
    );
    return TipoVariacionModel;
  }
}
