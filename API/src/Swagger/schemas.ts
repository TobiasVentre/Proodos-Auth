export const authSchemas = {
  LoginRequest: {
    type: "object",
    properties: {
      username: { type: "string", example: "jdoe" },
      password: { type: "string", example: "Password123" },
    },
    required: ["username", "password"],
  },
  LoginResponse: {
    type: "object",
    properties: {
      token: { type: "string" },
      user: {
        type: "object",
        properties: {
          username: { type: "string" },
          roles: { type: "array", items: { type: "string" } },
        },
      },
    },
  },
};

export const roleSchemas = {
  Role: {
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      description: { type: "string", nullable: true },
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
  },
  RoleAssignmentRequest: {
    type: "object",
    properties: {
      username: { type: "string" },
      roleId: { type: "number" },
    },
    required: ["username", "roleId"],
  },
};
