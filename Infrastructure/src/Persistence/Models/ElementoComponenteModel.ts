import { Model, DataTypes, Sequelize } from "sequelize";

export class ElementoComponenteModel extends Model {
  id_elemento!: number;
  id_componente!: number;
  id_tipo_elemento!: number;
  nombre!: string;
  icono_img!: string;
  descripcion!: string;
  link!: string;
  orden!: number;
  css_url!: string;

  static initModel(sequelize: Sequelize) {
    ElementoComponenteModel.init(
      {
        id_elemento: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_componente: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_tipo_elemento: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        icono_img: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        descripcion: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        link: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
        orden: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        css_url: {
          type: DataTypes.STRING(500),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "elemento_componente",
        schema: "dbo",
        timestamps: false,
      }
    );
    return ElementoComponenteModel;
  }
}
