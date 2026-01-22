import { Plan } from "./Plan";

export class Componente {
  id_componente!: number;
  id_tipo_componente!: number;
  id_plan!: number;
  id_tipo_variacion!: number;
  nombre!: string;
  fecha_creacion!: Date;
  estado!: string;
  fecha_baja?: Date | null;
  plan?: Plan;
}
