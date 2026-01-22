import { CreatePlanDTO } from "./CreatePlanDTO";
import { UpdatePlanDTO } from "./UpdatePlanDTO";
import { Plan } from "@proodos/domain/Entities/Plan";

export const mapCreatePlanDTOToEntity = (dto: CreatePlanDTO): Plan => ({
  nombre: dto.nombre,
  capacidad: dto.capacidad,
  capacidad_anterior: dto.capacidad_anterior,
  precio_full_price: dto.precio_full_price,
  precio_oferta: dto.precio_oferta,
  aumento: dto.aumento,
  precio_sin_iva: dto.precio_sin_iva,
  id_plan: 0,
});

export const mapUpdatePlanDTOToEntity = (dto: UpdatePlanDTO): Plan => ({
  id_plan: dto.id_plan,
  nombre: dto.nombre,
  capacidad: dto.capacidad,
  capacidad_anterior: dto.capacidad_anterior,
  precio_full_price: dto.precio_full_price,
  precio_oferta: dto.precio_oferta,
  aumento: dto.aumento,
  precio_sin_iva: dto.precio_sin_iva,
});
