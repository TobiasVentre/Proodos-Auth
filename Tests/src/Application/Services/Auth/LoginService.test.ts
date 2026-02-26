import { LoginService } from "@proodos/application/Services/Auth/LoginService";
import { AuthError } from "@proodos/application/Errors/AuthError";
import { LdapAuthProvider } from "@proodos/application/Interfaces/ILdapAuthProvider";
import { UserRoleRepository } from "@proodos/application/Interfaces/IUserRoleRepository";

describe("LoginService", () => {
  it("should throw when username or password are missing", async () => {
    // Arrange
    const ldapAuthProvider: LdapAuthProvider = {
      authenticate: jest.fn(),
    };
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn(),
      hasRole: jest.fn(),
    };
    const service = new LoginService(ldapAuthProvider, userRoleRepository);

    // Act
    const action = () => service.execute("", "");

    // Assert
    await expect(action()).rejects.toBeInstanceOf(AuthError);
  });

  it("should throw when credentials are invalid", async () => {
    // Arrange
    const ldapAuthProvider: LdapAuthProvider = {
      authenticate: jest.fn().mockResolvedValue(false),
    };
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn(),
      hasRole: jest.fn(),
    };
    const service = new LoginService(ldapAuthProvider, userRoleRepository);

    // Act
    const action = () => service.execute("jdoe", "bad");

    // Assert
    await expect(action()).rejects.toBeInstanceOf(AuthError);
  });

  it("should return username and roles on success", async () => {
    // Arrange
    const ldapAuthProvider: LdapAuthProvider = {
      authenticate: jest.fn().mockResolvedValue(true),
    };
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn().mockResolvedValue([
        { id: 1, name: "admin", description: null, createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: "user", description: null, createdAt: new Date(), updatedAt: new Date() },
      ]),
      hasRole: jest.fn(),
    };
    const service = new LoginService(ldapAuthProvider, userRoleRepository);

    // Act
    const result = await service.execute("jdoe", "ok");

    // Assert
    expect(result).toEqual({ username: "jdoe", roles: ["admin", "user"] });
  });
});
