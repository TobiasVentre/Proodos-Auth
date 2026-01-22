import { CreateTipoElementoService } from "@proodos/application/Services/TipoElemento/CreateTipoElementoService";
import { ITipoElementoRepository } from "@proodos/application/Interfaces/ITipoElementoRepository";
import { ILogger } from "@proodos/application/Interfaces/ILogger";
import { CreateTipoElementoDTO } from "@proodos/application/DTOs/TipoElemento/CreateTipoElementoDTO";

describe("CreateTipoElementoService", () => {
  it("should map the DTO and call repository.create", async () => {
    // Arrange
    const dto: CreateTipoElementoDTO = { nombre: "Header" };
    const createdEntity = { id_tipo_elemento: 1, nombre: "Header" };

    const tipoElementoRepository: ITipoElementoRepository = {
      create: jest.fn().mockResolvedValue(createdEntity),
      update: jest.fn(),
      patch: jest.fn(),
      getById: jest.fn(),
      getAll: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn()
    };

    const logger: ILogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn()
    };

    const service = new CreateTipoElementoService(tipoElementoRepository, logger);

    // Act
    const result = await service.execute(dto);

    // Assert
    expect(logger.info).toHaveBeenCalledWith(
      "[Service] CreateTipoElementoService.execute()"
    );
    expect(tipoElementoRepository.create).toHaveBeenCalledWith({
      id_tipo_elemento: 0,
      nombre: dto.nombre
    });
    expect(result).toEqual(createdEntity);
  });
});
