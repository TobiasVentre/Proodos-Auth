"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) Asegurar que las columnas FK existan (si ya existen, no hacemos nada)
    // (no usamos addColumn para evitar fallar si ya existen)

    // 2) Agregar FKs reales a componente
    await queryInterface.addConstraint(
      { schema: "dbo", tableName: "componente" },
      {
        fields: ["id_tipo_componente"],
        type: "foreign key",
        name: "FK_componente_tipo_componente",
        references: { table: { schema: "dbo", tableName: "tipo_componente" }, field: "id_tipo_componente" },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      }
    );

    await queryInterface.addConstraint(
      { schema: "dbo", tableName: "componente" },
      {
        fields: ["id_plan"],
        type: "foreign key",
        name: "FK_componente_plan",
        references: { table: { schema: "dbo", tableName: "plan" }, field: "id_plan" },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      }
    );

    await queryInterface.addConstraint(
      { schema: "dbo", tableName: "componente" },
      {
        fields: ["id_tipo_variacion"],
        type: "foreign key",
        name: "FK_componente_tipo_variacion",
        references: { table: { schema: "dbo", tableName: "tipo_variacion" }, field: "id_tipo_variacion" },
        onUpdate: "CASCADE",
        onDelete: "NO ACTION",
      }
    );

    // 3) Cambiar fecha_creacion a fecha+hora (Argentina)
    // Nota: en SQL Server guardamos DATETIMEOFFSET para preservar -03:00
    // Default: SYSDATETIMEOFFSET() AT TIME ZONE 'Argentina Standard Time'
    await queryInterface.sequelize.query(`
      DECLARE @dfName NVARCHAR(128);

      SELECT @dfName = dc.name
      FROM sys.default_constraints dc
      INNER JOIN sys.columns c
        ON c.default_object_id = dc.object_id
      INNER JOIN sys.tables t
        ON t.object_id = c.object_id
      INNER JOIN sys.schemas s
        ON s.schema_id = t.schema_id
      WHERE s.name = 'dbo'
        AND t.name = 'componente'
        AND c.name = 'fecha_creacion';

      IF @dfName IS NOT NULL
      BEGIN
        EXEC('ALTER TABLE [dbo].[componente] DROP CONSTRAINT [' + @dfName + ']');
      END
    `);

    // Cambiamos tipo (si hoy es DATE o DATETIME2, lo pasamos a DATETIMEOFFSET(0))
    await queryInterface.changeColumn(
      { schema: "dbo", tableName: "componente" },
      "fecha_creacion",
      {
        type: Sequelize.DATE, // Sequelize mapea a datetime2 en mssql; por eso usamos SQL crudo para forzar datetimeoffset
        allowNull: false,
      }
    );

    // Forzamos el tipo real a DATETIMEOFFSET(0) y default Argentina
    await queryInterface.sequelize.query(`
      ALTER TABLE [dbo].[componente]
      ALTER COLUMN [fecha_creacion] DATETIMEOFFSET(0) NOT NULL;

      ALTER TABLE [dbo].[componente]
      ADD CONSTRAINT [DF_componente_fecha_creacion]
      DEFAULT (SYSDATETIMEOFFSET() AT TIME ZONE 'Argentina Standard Time')
      FOR [fecha_creacion];
    `);

    // Indexes (recomendados para joins)
    await queryInterface.addIndex(
      { schema: "dbo", tableName: "componente" },
      ["id_tipo_componente"],
      { name: "IX_componente_id_tipo_componente" }
    );

    await queryInterface.addIndex(
      { schema: "dbo", tableName: "componente" },
      ["id_plan"],
      { name: "IX_componente_id_plan" }
    );

    await queryInterface.addIndex(
      { schema: "dbo", tableName: "componente" },
      ["id_tipo_variacion"],
      { name: "IX_componente_id_tipo_variacion" }
    );
  },

  async down(queryInterface) {
    // Revertir defaults/constraints de fecha_creacion
    await queryInterface.sequelize.query(`
      IF EXISTS (SELECT 1 FROM sys.default_constraints WHERE name = 'DF_componente_fecha_creacion')
        ALTER TABLE [dbo].[componente] DROP CONSTRAINT [DF_componente_fecha_creacion];
    `);

    // Sacar FKs
    await queryInterface.removeConstraint({ schema: "dbo", tableName: "componente" }, "FK_componente_tipo_variacion");
    await queryInterface.removeConstraint({ schema: "dbo", tableName: "componente" }, "FK_componente_plan");
    await queryInterface.removeConstraint({ schema: "dbo", tableName: "componente" }, "FK_componente_tipo_componente");
  },
};
