"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // dbo.elemento_componente
    await queryInterface.createTable(
      { schema: "dbo", tableName: "elemento_componente" },
      {
        id_elemento: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        id_componente: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { schema: "dbo", tableName: "componente" },
            key: "id_componente",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        id_tipo_elemento: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: { schema: "dbo", tableName: "tipo_elemento" },
            key: "id_tipo_elemento",
          },
          onUpdate: "CASCADE",
          onDelete: "NO ACTION",
        },
        nombre: {
          type: Sequelize.CHAR(50),
          allowNull: false,
        },
        icono_img: {
          type: Sequelize.CHAR(500),
          allowNull: true,
        },
        descripcion: {
          type: Sequelize.CHAR(255),
          allowNull: true,
        },
        link: {
          type: Sequelize.CHAR(500),
          allowNull: true,
        },
        orden: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        css_url: {
          type: Sequelize.CHAR(500),
          allowNull: true,
        },
      }
    );

    await queryInterface.addIndex(
      { schema: "dbo", tableName: "elemento_componente" },
      ["id_componente"],
      { name: "IX_elemento_componente_id_componente" }
    );

    await queryInterface.addIndex(
      { schema: "dbo", tableName: "elemento_componente" },
      ["id_tipo_elemento"],
      { name: "IX_elemento_componente_id_tipo_elemento" }
    );

    // dbo.componente_compuesto (muchos-a-muchos: componente padre/hijo)
    await queryInterface.createTable(
      { schema: "dbo", tableName: "componente_compuesto" },
      {
        id_componente_padre: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: { schema: "dbo", tableName: "componente" },
            key: "id_componente",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        id_componente_hijo: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: { schema: "dbo", tableName: "componente" },
            key: "id_componente",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
      }
    );

    await queryInterface.addIndex(
      { schema: "dbo", tableName: "componente_compuesto" },
      ["id_componente_padre"],
      { name: "IX_componente_compuesto_padre" }
    );

    await queryInterface.addIndex(
      { schema: "dbo", tableName: "componente_compuesto" },
      ["id_componente_hijo"],
      { name: "IX_componente_compuesto_hijo" }
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable({ schema: "dbo", tableName: "componente_compuesto" });
    await queryInterface.dropTable({ schema: "dbo", tableName: "elemento_componente" });
  },
};
