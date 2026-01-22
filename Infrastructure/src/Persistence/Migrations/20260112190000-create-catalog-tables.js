"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // dbo.tipo_componente
    await queryInterface.createTable(
      { schema: "dbo", tableName: "tipo_componente" },
      {
        id_tipo_componente: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre: {
          type: Sequelize.CHAR(50),
          allowNull: false,
        },
        estado: {
          type: Sequelize.CHAR(50),
          allowNull: false,
        },
      }
    );

    // dbo.plan  (según el DER hay muchos campos; dejamos los principales y precios)
    await queryInterface.createTable(
      { schema: "dbo", tableName: "plan" },
      {
        id_plan: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre: {
          type: Sequelize.CHAR(50),
          allowNull: false,
        },
        descripcion: {
          type: Sequelize.CHAR(255),
          allowNull: true,
        },
        capacidad: {
          type: Sequelize.CHAR(50),
          allowNull: true,
        },
        capacidad_anterior: {
          type: Sequelize.CHAR(50),
          allowNull: true,
        },
        precio_full_price: {
          type: Sequelize.DECIMAL(12, 2),
          allowNull: true,
        },
        precio_oferta: {
          type: Sequelize.DECIMAL(12, 2),
          allowNull: true,
        },
        aumento: {
          type: Sequelize.DECIMAL(12, 2),
          allowNull: true,
        },
        precio_sin_iva: {
          type: Sequelize.DECIMAL(12, 2),
          allowNull: true,
        },
        estado: {
          type: Sequelize.CHAR(50),
          allowNull: false,
          defaultValue: "ACTIVO",
        },
      }
    );

    // dbo.tipo_variacion
    await queryInterface.createTable(
      { schema: "dbo", tableName: "tipo_variacion" },
      {
        id_tipo_variacion: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        id_tipo_componente: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { schema: "dbo", tableName: "tipo_componente" },
            key: "id_tipo_componente",
          },
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
        },
        nombre: {
          type: Sequelize.CHAR(50),
          allowNull: false,
        },
        descripcion: {
          type: Sequelize.CHAR(500),
          allowNull: true,
        },
        css_url: {
          type: Sequelize.CHAR(500),
          allowNull: true,
        },
        js_url: {
          type: Sequelize.CHAR(500),
          allowNull: true,
        },
      }
    );

    await queryInterface.addIndex(
      { schema: "dbo", tableName: "tipo_variacion" },
      ["id_tipo_componente"],
      { name: "IX_tipo_variacion_id_tipo_componente" }
    );

    // dbo.tipo_elemento
    await queryInterface.createTable(
      { schema: "dbo", tableName: "tipo_elemento" },
      {
        id_tipo_elemento: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        nombre: {
          type: Sequelize.CHAR(50),
          allowNull: false,
        },
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable({ schema: "dbo", tableName: "tipo_elemento" });
    await queryInterface.dropTable({ schema: "dbo", tableName: "tipo_variacion" });
    await queryInterface.dropTable({ schema: "dbo", tableName: "plan" });
    await queryInterface.dropTable({ schema: "dbo", tableName: "tipo_componente" });
  },
};
