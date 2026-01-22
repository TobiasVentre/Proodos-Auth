export interface TipoVariacionDTO {
  id_tipo_variacion: number;
  id_tipo_componente: number;
  nombre: string;
  descripcion?: string | null;
  css_url?: string | null;
  js_url?: string | null;
  html?: string | null;
}
