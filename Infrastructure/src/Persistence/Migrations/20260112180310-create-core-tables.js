'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /* =========================================================
       LANDING_PAGE
       ========================================================= */
    await queryInterface.createTable(
      'landing_page',
      {
        id_landing: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        URL: {
          type: Sequelize.STRING(500),
          allowNull: false,
        },
        estado: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        segmento: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      { schema: 'dbo' }
    );

    /* =========================================================
       COMPONENTE
       ========================================================= */
    await queryInterface.createTable(
      'componente',
      {
        id_componente: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        id_tipo_componente: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        id_plan: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        id_tipo_variacion: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        nombre: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        fecha_creacion: {
          // SQL Server: DATETIME2 vía Sequelize.DATE
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('SYSUTCDATETIME()'),
        },
      },
      { schema: 'dbo' }
    );

    /* =========================================================
       LANDING_COMPONENTE (tabla puente)
       ========================================================= */
    await queryInterface.createTable(
      'landing_componente',
      {
        id_landing: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        id_componente: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
      },
      { schema: 'dbo' }
    );

    /* =========================================================
       ÍNDICES
       ========================================================= */
    await queryInterface.addIndex(
      { tableName: 'landing_componente', schema: 'dbo' },
      ['id_landing'],
      { name: 'IX_landing_componente_id_landing' }
    );

    await queryInterface.addIndex(
      { tableName: 'landing_componente', schema: 'dbo' },
      ['id_componente'],
      { name: 'IX_landing_componente_id_componente' }
    );

    /* =========================================================
       FOREIGN KEYS
       ========================================================= */
    await queryInterface.addConstraint(
      { tableName: 'landing_componente', schema: 'dbo' },
      {
        type: 'foreign key',
        name: 'FK_landing_componente_landing_page',
        fields: ['id_landing'],
        references: {
          table: { tableName: 'landing_page', schema: 'dbo' },
          field: 'id_landing',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );

    await queryInterface.addConstraint(
      { tableName: 'landing_componente', schema: 'dbo' },
      {
        type: 'foreign key',
        name: 'FK_landing_componente_componente',
        fields: ['id_componente'],
        references: {
          table: { tableName: 'componente', schema: 'dbo' },
          field: 'id_componente',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  async down(queryInterface) {
    // Orden inverso por dependencias
    await queryInterface.dropTable({ tableName: 'landing_componente', schema: 'dbo' });
    await queryInterface.dropTable({ tableName: 'componente', schema: 'dbo' });
    await queryInterface.dropTable({ tableName: 'landing_page', schema: 'dbo' });
  },
};
