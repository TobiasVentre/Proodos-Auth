import { UpdateComponenteDTO } from "../../DTOs/Componente/UpdateComponenteDTO";
import { IComponenteRepository } from "../../Interfaces/IComponenteRepository";
import { Componente } from "@proodos/domain/Entities/Componente";

export class UpdateComponenteService {
  constructor(private readonly componenteRepository: IComponenteRepository) {}

  async execute(dto: UpdateComponenteDTO): Promise<Componente> {
    return await this.componenteRepository.update(dto as Componente);
  }
}
