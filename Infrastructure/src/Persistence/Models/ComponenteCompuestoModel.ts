import { Model, DataTypes, Sequelize } from "sequelize";

export class ComponenteCompuestoModel extends Model {
  id_padre!: number;
  id_hijo!: number;

  static initModel(sequelize: Sequelize) {
    ComponenteCompuestoModel.init(
      {
        id_padre: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          field: "id_componente_padre",
        },
        id_hijo: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          field: "id_componente_hijo",
        },
      },
      {
        sequelize,
        tableName: "componente_compuesto",
        schema: "dbo",
        timestamps: false,
      }
    );
    return ComponenteCompuestoModel;
  }
}
