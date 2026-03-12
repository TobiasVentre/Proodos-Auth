import { RolesService } from "@proodos/application/Services/Auth/RolesService";
import { RoleRepository } from "@proodos/application/Interfaces/IRoleRepository";
import { UserRoleRepository } from "@proodos/application/Interfaces/IUserRoleRepository";

describe("RolesService", () => {
  it("should throw when role name is missing", async () => {
    // Arrange
    const roleRepository: RoleRepository = {
      create: jest.fn(),
      list: jest.fn(),
    };
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn(),
      hasRole: jest.fn(),
    };
    const service = new RolesService(roleRepository, userRoleRepository);

    // Act
    const action = () => service.createRole("");

    // Assert
    await expect(action()).rejects.toBeInstanceOf(Error);
  });

  it("should create role when name is valid", async () => {
    // Arrange
    const role = {
      id: 1,
      name: "admin",
      description: "administrador",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const roleRepository: RoleRepository = {
      create: jest.fn().mockResolvedValue(role),
      list: jest.fn(),
    };
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn(),
      hasRole: jest.fn(),
    };
    const service = new RolesService(roleRepository, userRoleRepository);

    // Act
    const result = await service.createRole("admin", "administrador");

    // Assert
    expect(roleRepository.create).toHaveBeenCalledWith("admin", "administrador");
    expect(result).toEqual(role);
  });

  it("should list roles", async () => {
    // Arrange
    const roles = [
      { id: 1, name: "admin", description: null, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "desarrollador", description: null, createdAt: new Date(), updatedAt: new Date() },
    ];
    const roleRepository: RoleRepository = {
      create: jest.fn(),
      list: jest.fn().mockResolvedValue(roles),
    };
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn(),
      hasRole: jest.fn(),
    };
    const service = new RolesService(roleRepository, userRoleRepository);

    // Act
    const result = await service.listRoles();

    // Assert
    expect(roleRepository.list).toHaveBeenCalledTimes(1);
    expect(result).toEqual(roles);
  });

  it("should throw when username is missing in assignment", async () => {
    // Arrange
    const roleRepository: RoleRepository = {
      create: jest.fn(),
      list: jest.fn(),
    };
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn(),
      hasRole: jest.fn(),
    };
    const service = new RolesService(roleRepository, userRoleRepository);

    // Act
    const action = () => service.assignRole("", 1);

    // Assert
    await expect(action()).rejects.toBeInstanceOf(Error);
  });

  it("should throw when roleId is missing in assignment", async () => {
    // Arrange
    const roleRepository: RoleRepository = {
      create: jest.fn(),
      list: jest.fn(),
    };
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn(),
      hasRole: jest.fn(),
    };
    const service = new RolesService(roleRepository, userRoleRepository);

    // Act
    const action = () => service.assignRole("jdoe", 0);

    // Assert
    await expect(action()).rejects.toBeInstanceOf(Error);
  });

  it("should prevent duplicate role assignment", async () => {
    // Arrange
    const roleRepository: RoleRepository = {
      create: jest.fn(),
      list: jest.fn(),
    };
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn(),
      getRolesByUsername: jest.fn(),
      hasRole: jest.fn().mockResolvedValue(true),
    };
    const service = new RolesService(roleRepository, userRoleRepository);

    // Act
    const action = () => service.assignRole("jdoe", 1);

    // Assert
    await expect(action()).rejects.toBeInstanceOf(Error);
  });

  it("should assign role when not present", async () => {
    // Arrange
    const roleRepository: RoleRepository = {
      create: jest.fn(),
      list: jest.fn(),
    };
    const assignment = {
      id: 1,
      username: "jdoe",
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const userRoleRepository: UserRoleRepository = {
      assign: jest.fn().mockResolvedValue(assignment),
      getRolesByUsername: jest.fn(),
      hasRole: jest.fn().mockResolvedValue(false),
    };
    const service = new RolesService(roleRepository, userRoleRepository);

    // Act
    const result = await service.assignRole("jdoe", 2);

    // Assert
    expect(result).toEqual(assignment);
    expect(userRoleRepository.assign).toHaveBeenCalledWith("jdoe", 2);
  });
});
