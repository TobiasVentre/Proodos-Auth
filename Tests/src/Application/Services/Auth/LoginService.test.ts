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

  it("should normalize domain username and filter allowed roles", async () => {
    // Arrange
    const ldapAuthProvider: LdapAuthProvider = {
      authenticate: jest.fn().mockResolvedValue(true),
    };
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn().mockResolvedValue([
        { id: 1, name: " Admin ", description: null, createdAt: new Date(), updatedAt: new Date() },
        { id: 2, name: "viewer", description: null, createdAt: new Date(), updatedAt: new Date() },
        { id: 3, name: "Desarrollador", description: null, createdAt: new Date(), updatedAt: new Date() },
      ]),
      hasRole: jest.fn(),
    };
    const service = new LoginService(ldapAuthProvider, userRoleRepository);

    // Act
    const result = await service.execute("ACME\\jdoe", "ok");

    // Assert
    expect(userRoleRepository.getRolesByUsername).toHaveBeenCalledWith("jdoe");
    expect(result).toEqual({ username: "jdoe", roles: ["admin", "desarrollador"] });
  });

  it("should normalize email username", async () => {
    // Arrange
    const ldapAuthProvider: LdapAuthProvider = {
      authenticate: jest.fn().mockResolvedValue(true),
    };
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn().mockResolvedValue([
        { id: 1, name: "admin", description: null, createdAt: new Date(), updatedAt: new Date() },
      ]),
      hasRole: jest.fn(),
    };
    const service = new LoginService(ldapAuthProvider, userRoleRepository);

    // Act
    const result = await service.execute("jdoe@acme.local", "ok");

    // Assert
    expect(userRoleRepository.getRolesByUsername).toHaveBeenCalledWith("jdoe");
    expect(result).toEqual({ username: "jdoe", roles: ["admin"] });
  });

  it("should throw when user has no allowed roles", async () => {
    // Arrange
    const ldapAuthProvider: LdapAuthProvider = {
      authenticate: jest.fn().mockResolvedValue(true),
    };
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn().mockResolvedValue([
        { id: 1, name: "viewer", description: null, createdAt: new Date(), updatedAt: new Date() },
      ]),
      hasRole: jest.fn(),
    };
    const service = new LoginService(ldapAuthProvider, userRoleRepository);

    // Act
    const action = () => service.execute("jdoe", "ok");

    // Assert
    await expect(action()).rejects.toBeInstanceOf(AuthError);
  });
});
