export const authSchemas = {
  JwtClaimsContract: {
    type: "object",
    description:
      "Contrato esperado para los JWT emitidos por Auth. Se documenta con fines de auditoría y referencia técnica.",
    properties: {
      sub: { type: "string", description: "Identificador del usuario autenticado." },
      roles: {
        type: "array",
        description: "Arreglo no vacío de roles normalizados.",
        items: { type: "string" },
      },
      token_use: {
        type: "string",
        enum: ["access", "refresh"],
        description: "Diferencia access token de refresh token.",
      },
      jti: {
        type: "string",
        description:
          "Identificador único del refresh token. Se persiste para soportar rotación y revocación.",
      },
      iss: { type: "string", description: "Issuer configurado en JWT_ISSUER." },
      aud: { type: "string", description: "Audience configurado en JWT_AUDIENCE." },
      iat: { type: "integer", description: "Issued at." },
      exp: { type: "integer", description: "Expiration time." },
    },
    required: ["sub", "roles", "token_use", "iss", "aud"],
  },
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
      token: {
        type: "string",
        description:
          "Access token JWT. Debe incluir sub, roles, token_use=access, iss y aud válidos.",
      },
      refreshToken: {
        type: "string",
        description:
          "Refresh token JWT persistido en servidor. Debe incluir sub, roles, token_use=refresh, jti, iss y aud válidos.",
      },
      user: {
        type: "object",
        properties: {
          username: { type: "string" },
          roles: { type: "array", items: { type: "string" } },
        },
      },
    },
  },
  RefreshTokenRequest: {
    type: "object",
    properties: {
      refreshToken: { type: "string" },
    },
    required: ["refreshToken"],
  },
  RefreshTokenResponse: {
    type: "object",
    properties: {
      token: {
        type: "string",
        description:
          "Nuevo access token JWT emitido luego de validar un refresh token de tipo refresh y recalcular los roles vigentes desde base.",
      },
      refreshToken: {
        type: "string",
        description:
          "Nuevo refresh token JWT. El refresh token anterior queda invalidado inmediatamente tras una rotación exitosa.",
      },
    },
  },
  LogoutRequest: {
    type: "object",
    properties: {
      refreshToken: {
        type: "string",
        description: "Refresh token JWT a revocar.",
      },
    },
    required: ["refreshToken"],
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
