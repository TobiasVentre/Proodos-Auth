import type { QueryInterface } from "sequelize";

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addConstraint("user_roles", {
      type: "unique",
      name: "user_roles_username_role_id_unique",
      fields: ["username", "role_id"],
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.removeConstraint("user_roles", "user_roles_username_role_id_unique");
  },
};
