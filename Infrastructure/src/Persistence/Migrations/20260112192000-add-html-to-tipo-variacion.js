"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      { schema: "dbo", tableName: "tipo_variacion" },
      "html",
      {
        type: Sequelize.TEXT,
        allowNull: true,
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      { schema: "dbo", tableName: "tipo_variacion" },
      "html"
    );
  },
};
