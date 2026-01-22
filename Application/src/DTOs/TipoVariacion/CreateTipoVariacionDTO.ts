export interface CreateTipoVariacionDTO {
  id_tipo_componente: number;
  nombre: string;
  descripcion?: string | null;
  css_url?: string | null;
  js_url?: string | null;
  html?: string | null;
}
