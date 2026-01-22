import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { Componente } from "@proodos/domain/Entities/Componente";
import { GetAllComponentesUseCase } from "../../Ports/ComponenteUseCases";

export class GetAllComponentesService implements GetAllComponentesUseCase {
  constructor(private readonly componenteRepository: IComponenteRepository) {}

  async execute(): Promise<Componente[]> {
    return await this.componenteRepository.getAll();
  }
}
