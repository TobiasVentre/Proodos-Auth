import { Model, DataTypes, Sequelize } from "sequelize";

export class ComponenteModel extends Model {
  id_componente!: number;
  id_tipo_componente!: number;
  id_plan!: number;
  id_tipo_variacion!: number;
  nombre!: string;
  fecha_creacion!: Date;
  estado!: string;
  fecha_baja?: Date | null;

  static initModel(sequelize: Sequelize) {
    ComponenteModel.init(
      {
        id_componente: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        id_tipo_componente: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_plan: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_tipo_variacion: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nombre: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        fecha_creacion: {
          type: DataTypes.DATE,
          allowNull: false,
          // si querés que DB lo haga, lo pondremos en migration.
        },
        estado: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        fecha_baja: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "componente",
        schema: "dbo",
        timestamps: false,
      }
    );

    return ComponenteModel;
  }
}
