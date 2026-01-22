"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const AuthError_1 = require("@proodos/application/Errors/AuthError");
class LoginService {
    ldapAuthProvider;
    userRoleRepository;
    constructor(ldapAuthProvider, userRoleRepository) {
        this.ldapAuthProvider = ldapAuthProvider;
        this.userRoleRepository = userRoleRepository;
    }
    async execute(username, password) {
        if (!username || !password) {
            throw new AuthError_1.AuthError("Usuario y contraseña son obligatorios.");
        }
        const isValid = await this.ldapAuthProvider.authenticate(username, password);
        if (!isValid) {
            throw new AuthError_1.AuthError("Credenciales inválidas.");
        }
        const roles = await this.userRoleRepository.getRolesByUsername(username);
        return {
            username,
            roles: roles.map((role) => role.name),
        };
    }
}
exports.LoginService = LoginService;
