export const componenteSchemas = {
  CreateComponenteDTO: {
    type: "object",
    required: [
      "id_tipo_componente",
      "id_plan",
      "id_tipo_variacion",
      "nombre"
    ],
    properties: {
      id_tipo_componente: { type: "integer", example: 1 },
      id_plan: { type: "integer", example: 2 },
      id_tipo_variacion: { type: "integer", example: 3 },
      nombre: { type: "string", example: "Banner principal" }
    }
  }
};

export const planSchemas = {
  CreatePlanDTO: {
    type: "object",
    required: [
      "nombre",
      "capacidad",
      "capacidad_anterior",
      "precio_full_price",
      "precio_oferta",
      "aumento",
      "precio_sin_iva"
    ],
    properties: {
      nombre: { type: "string", example: "Plan Hogar" },
      capacidad: { type: "integer", example: 100 },
      capacidad_anterior: { type: "integer", example: 50 },
      precio_full_price: { type: "number", example: 15000 },
      precio_oferta: { type: "number", example: 12000 },
      aumento: { type: "number", example: 3000 },
      precio_sin_iva: { type: "number", example: 9900 }
    }
  },
  UpdatePlanDTO: {
    type: "object",
    required: [
      "nombre",
      "capacidad",
      "capacidad_anterior",
      "precio_full_price",
      "precio_oferta",
      "aumento",
      "precio_sin_iva"
    ],
    properties: {
      nombre: { type: "string", example: "Plan Hogar" },
      capacidad: { type: "integer", example: 100 },
      capacidad_anterior: { type: "integer", example: 50 },
      precio_full_price: { type: "number", example: 15000 },
      precio_oferta: { type: "number", example: 12000 },
      aumento: { type: "number", example: 3000 },
      precio_sin_iva: { type: "number", example: 9900 }
    }
  },
  PatchPlanDTO: {
    type: "object",
    properties: {
      nombre: { type: "string", example: "Plan Hogar" },
      capacidad: { type: "integer", example: 100 },
      capacidad_anterior: { type: "integer", example: 50 },
      precio_full_price: { type: "number", example: 15000 },
      precio_oferta: { type: "number", example: 12000 },
      aumento: { type: "number", example: 3000 },
      precio_sin_iva: { type: "number", example: 9900 }
    }
  }
};

export const landingSchemas = {
  LandingPageDTO: {
    type: "object",
    required: ["id_landing", "URL", "estado", "segmento"],
    properties: {
      id_landing: { type: "integer", example: 10 },
      URL: { type: "string", example: "https://www.movistar.com.ar/landing/oferta" },
      estado: { type: "string", example: "ACTIVA" },
      segmento: { type: "string", example: "HOGAR" }
    }
  }
};

export const tipoComponenteSchemas = {
  CreateTipoComponenteDTO: {
    type: "object",
    required: ["nombre", "estado"],
    properties: {
      nombre: { type: "string", example: "banner" },
      estado: { type: "string", example: "ACTIVO" }
    }
  },
  PatchTipoComponenteDTO: {
    type: "object",
    properties: {
      nombre: { type: "string", example: "banner" },
      estado: { type: "string", example: "ACTIVO" }
    }
  }
};

export const tipoVariacionSchemas = {
  CreateTipoVariacionDTO: {
    type: "object",
    required: ["id_tipo_componente", "nombre"],
    properties: {
      id_tipo_componente: { type: "integer", example: 1 },
      nombre: { type: "string", example: "imagen izquierda" },
      descripcion: { type: "string", example: "Variación con imagen a la izquierda" },
      css_url: { type: "string", example: "/css/variaciones/banner.css" },
      js_url: { type: "string", example: "/js/variaciones/banner.js" },
      html: { type: "string", example: "<div class='banner'></div>" }
    }
  },
  PatchTipoVariacionDTO: {
    type: "object",
    properties: {
      id_tipo_componente: { type: "integer", example: 1 },
      nombre: { type: "string", example: "imagen izquierda" },
      descripcion: { type: "string", example: "Variación con imagen a la izquierda" },
      css_url: { type: "string", example: "/css/variaciones/banner.css" },
      js_url: { type: "string", example: "/js/variaciones/banner.js" },
      html: { type: "string", example: "<div class='banner'></div>" }
    }
  }
};

export const tipoElementoSchemas = {
  CreateTipoElementoDTO: {
    type: "object",
    required: ["nombre"],
    properties: {
      nombre: { type: "string", example: "titulo" }
    }
  },
  PatchTipoElementoDTO: {
    type: "object",
    properties: {
      nombre: { type: "string", example: "titulo" }
    }
  }
};

export const elementoComponenteSchemas = {
  CreateElementoComponenteDTO: {
    type: "object",
    required: [
      "id_componente",
      "id_tipo_elemento",
      "nombre",
      "icono_img",
      "descripcion",
      "link",
      "orden",
      "css_url"
    ],
    properties: {
      id_componente: { type: "integer", example: 10 },
      id_tipo_elemento: { type: "integer", example: 2 },
      nombre: { type: "string", example: "Titulo principal" },
      icono_img: { type: "string", example: "https://cdn.example.com/icono.png" },
      descripcion: { type: "string", example: "Texto descriptivo" },
      link: { type: "string", example: "https://example.com" },
      orden: { type: "integer", example: 1 },
      css_url: { type: "string", example: "/css/elementos/titulo.css" }
    }
  },
  PatchElementoComponenteDTO: {
    type: "object",
    properties: {
      id_componente: { type: "integer", example: 10 },
      id_tipo_elemento: { type: "integer", example: 2 },
      nombre: { type: "string", example: "Titulo principal" },
      icono_img: { type: "string", example: "https://cdn.example.com/icono.png" },
      descripcion: { type: "string", example: "Texto descriptivo" },
      link: { type: "string", example: "https://example.com" },
      orden: { type: "integer", example: 1 },
      css_url: { type: "string", example: "/css/elementos/titulo.css" }
    }
  }
};
