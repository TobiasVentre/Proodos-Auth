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
