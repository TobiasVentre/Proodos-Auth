"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar columna estado si no existe
    await queryInterface.sequelize.query(`
      IF COL_LENGTH('dbo.componente', 'estado') IS NULL
      BEGIN
        ALTER TABLE dbo.componente
        ADD estado VARCHAR(50) NOT NULL
        CONSTRAINT DF_componente_estado DEFAULT 'ACTIVO';
      END;
    `);

    // Agregar columna fecha_baja si no existe
    await queryInterface.sequelize.query(`
      IF COL_LENGTH('dbo.componente', 'fecha_baja') IS NULL
      BEGIN
        ALTER TABLE dbo.componente
        ADD fecha_baja DATETIME NULL;
      END;
    `);
  },

  async down(queryInterface, Sequelize) {
    // Quitar fecha_baja si existe
    await queryInterface.sequelize.query(`
      IF COL_LENGTH('dbo.componente', 'fecha_baja') IS NOT NULL
      BEGIN
        ALTER TABLE dbo.componente
        DROP COLUMN fecha_baja;
      END;
    `);

    // Quitar estado y su constraint si existe
    await queryInterface.sequelize.query(`
      IF COL_LENGTH('dbo.componente', 'estado') IS NOT NULL
      BEGIN
        ALTER TABLE dbo.componente
        DROP CONSTRAINT DF_componente_estado;
        ALTER TABLE dbo.componente
        DROP COLUMN estado;
      END;
    `);
  },
};
