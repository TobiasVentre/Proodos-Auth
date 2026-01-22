import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { Componente } from "@proodos/domain/Entities/Componente";
import { GetComponenteByIdUseCase } from "../../Ports/ComponenteUseCases";

export class GetComponenteByIdService implements GetComponenteByIdUseCase {
  constructor(private readonly componenteRepository: IComponenteRepository) {}

  async execute(id_componente: number): Promise<Componente | null> {
    return await this.componenteRepository.getById(id_componente);
  }
}
