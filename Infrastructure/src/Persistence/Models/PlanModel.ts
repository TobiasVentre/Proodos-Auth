import { Model, DataTypes, Sequelize } from "sequelize";

export class PlanModel extends Model {
  id_plan!: number;
  nombre!: string;
  capacidad!: number;
  capacidad_anterior!: number;
  precio_full_price!: number;
  precio_oferta!: number;
  aumento!: number;
  precio_sin_iva!: number;

  static initModel(sequelize: Sequelize) {
    PlanModel.init(
      {
        id_plan: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        capacidad: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        capacidad_anterior: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        precio_full_price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        precio_oferta: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        aumento: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        precio_sin_iva: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "plan",
        schema: "dbo",
        timestamps: false,
      }
    );

    return PlanModel;
  }
}
