export interface PatchComponenteDTO {
  id_tipo_componente?: number;
  id_plan?: number;
  id_tipo_variacion?: number;
  nombre?: string;
  estado?: string;
  fecha_baja?: Date | null;
}
