import { ApiClient } from "./services/apiClient.js";
import { ComponenteService } from "./services/componenteService.js";
import { LandingService } from "./services/landingService.js";
import { PlanService } from "./services/planService.js";
import { ListSectionRenderer } from "./renderers/listSectionRenderer.js";
import { ComponentDetailRenderer } from "./renderers/componentDetailRenderer.js";
import { ComponentFormRenderer } from "./renderers/componentFormRenderer.js";

const appRoot = document.getElementById("app");
const apiBaseInput = document.getElementById("apiBase");
const reloadButton = document.getElementById("reloadData");

const apiClient = new ApiClient(getSavedApiBase());
const componenteService = new ComponenteService(apiClient);
const landingService = new LandingService(apiClient);
const planService = new PlanService(apiClient);

const landingRenderer = new ListSectionRenderer({
  id: "landings",
  title: "Landing pages",
  description: "Listado de LP registradas en el sistema.",
  emptyMessage: "No hay landing pages registradas.",
  fieldMap: [
    { label: "URL", key: "url" },
    { label: "Segmento", key: "segmento" },
  ],
});

const componenteRenderer = new ListSectionRenderer({
  id: "componentes-listado",
  title: "Listado de componentes",
  description: "Componentes reutilizables para LP.",
  emptyMessage: "No hay componentes disponibles.",
  fieldMap: [
    { label: "Tipo", key: "id_tipo_componente" },
    { label: "Plan", key: "id_plan" },
    { label: "Variación", key: "id_tipo_variacion" },
  ],
  action: {
    label: "Ver detalle",
    idKey: "id_componente",
  },
});

const planRenderer = new ListSectionRenderer({
  id: "planes",
  title: "Planes",
  description: "Información comercial de planes.",
  emptyMessage: "No hay planes registrados.",
  fieldMap: [
    { label: "Capacidad", key: "capacidad" },
    { label: "Precio oferta", key: "precio_oferta" },
    { label: "Precio full", key: "precio_full_price" },
  ],
});

const componentDetailRenderer = new ComponentDetailRenderer({
  id: "componente-detalle",
  title: "Detalle de componente",
  description: "Información completa del componente seleccionado.",
  emptyMessage: "Seleccioná un componente del listado para ver el detalle.",
});

const componentFormRenderer = new ComponentFormRenderer({
  id: "componente-formulario",
  title: "Alta de componente",
  description: "Cargá un nuevo componente para reutilizar en landing pages.",
});

const sections = [
  {
    fetch: () => landingService.getAll(),
    renderer: landingRenderer,
    transform: (items) => items,
  },
  {
    fetch: () => planService.getAll(),
    renderer: planRenderer,
    transform: (items) => items.map(formatPlan),
  },
];

let componentesCache = [];
let componentesSectionNode = null;
let componenteModuleNode = null;
let selectedComponenteId = null;
let detailState = { loading: false, error: null, data: null };
let formState = { loading: false, error: null, success: null };
let componentesLoading = false;
let componentesError = null;
let componentView = "list";

function getSavedApiBase() {
  return localStorage.getItem("proodos:apiBase") || "/api";
}

function formatPlan(plan) {
  return {
    ...plan,
    precio_oferta: formatCurrency(plan.precio_oferta),
    precio_full_price: formatCurrency(plan.precio_full_price),
  };
}

function formatCurrency(value) {
  if (value === undefined || value === null || value === "") {
    return "-";
  }
  const numberValue = Number(value);
  if (Number.isNaN(numberValue)) {
    return value;
  }
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(numberValue);
}

async function renderSections() {
  appRoot.innerHTML = "";

  const placeholders = sections.map((section) => {
    const node = section.renderer.render([], { loading: true });
    appRoot.appendChild(node);
    return node;
  });

  componentesLoading = true;
  componentesError = null;
  componenteModuleNode = renderComponentModule();
  appRoot.insertBefore(componenteModuleNode, placeholders[1] ?? null);

  const results = await Promise.allSettled(
    sections.map((section) => section.fetch())
  );

  results.forEach((result, index) => {
    const section = sections[index];
    if (result.status === "fulfilled") {
      const items = Array.isArray(result.value) ? result.value : [];
      const node = section.renderer.render(section.transform(items), {
        selectedId: selectedComponenteId,
      });
      appRoot.replaceChild(node, placeholders[index]);
      placeholders[index] = node;
      return;
    }

    const node = section.renderer.render([], {
      error: "No fue posible obtener la información desde la API.",
    });
    appRoot.replaceChild(node, placeholders[index]);
    placeholders[index] = node;
  });

  await loadComponentes();
}

function attachComponenteActions(sectionNode) {
  sectionNode.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action='detail']");
    if (!button) {
      return;
    }
    const id = Number(button.dataset.id);
    if (!id || Number.isNaN(id)) {
      return;
    }
    setComponentView("list");
    loadComponentDetail(id);
  });
}

function renderComponentModule() {
  const section = document.createElement("section");
  section.className = "section-card componente-module";
  section.id = "componentes";

  const header = document.createElement("div");
  header.className = "module-header";

  const title = document.createElement("h2");
  title.textContent = "Módulo de componentes";
  header.appendChild(title);

  const actions = document.createElement("div");
  actions.className = "module-actions";

  const listButton = document.createElement("button");
  listButton.type = "button";
  listButton.className = `module-button ${
    componentView === "list" ? "module-button--active" : ""
  }`;
  listButton.textContent = "Ver listados";
  listButton.addEventListener("click", () => setComponentView("list"));

  const createButton = document.createElement("button");
  createButton.type = "button";
  createButton.className = `module-button ${
    componentView === "create" ? "module-button--active" : ""
  }`;
  createButton.textContent = "Crear componente";
  createButton.addEventListener("click", () => setComponentView("create"));

  actions.appendChild(listButton);
  actions.appendChild(createButton);
  header.appendChild(actions);
  section.appendChild(header);

  const body = document.createElement("div");
  body.className = "module-body";

  if (componentView === "create") {
    const formNode = componentFormRenderer.render({
      onSubmit: handleCreateComponent,
      loading: formState.loading,
      error: formState.error,
      success: formState.success,
    });
    formNode.classList.add("module-panel");
    body.appendChild(formNode);
  } else {
    const listNode = componenteRenderer.render(componentesCache, {
      loading: componentesLoading,
      error: componentesError,
      selectedId: selectedComponenteId,
    });
    listNode.classList.add("module-panel");
    body.appendChild(listNode);
    componentesSectionNode = listNode;
    attachComponenteActions(listNode);

    const detailNode = componentDetailRenderer.render(detailState.data, {
      loading: detailState.loading,
      error: detailState.error,
    });
    detailNode.classList.add("module-panel");
    body.appendChild(detailNode);
  }

  section.appendChild(body);
  return section;
}

function updateComponentModule() {
  if (!componenteModuleNode) {
    return;
  }
  const node = renderComponentModule();
  appRoot.replaceChild(node, componenteModuleNode);
  componenteModuleNode = node;
}

function setComponentView(view) {
  componentView = view;
  updateComponentModule();
}

async function loadComponentDetail(id) {
  selectedComponenteId = id;
  detailState = { loading: true, error: null, data: null };
  updateComponentModule();

  try {
    const data = await componenteService.getById(id);
    detailState = { loading: false, error: null, data };
  } catch (error) {
    detailState = {
      loading: false,
      error: "No fue posible obtener el detalle del componente.",
      data: null,
    };
  }

  updateComponentModule();
}

async function loadComponentes() {
  componentesLoading = true;
  componentesError = null;
  updateComponentModule();

  try {
    const data = await componenteService.getAll();
    componentesCache = Array.isArray(data) ? data : [];
  } catch (error) {
    componentesCache = [];
    componentesError = "No fue posible obtener la lista de componentes.";
  } finally {
    componentesLoading = false;
  }

  updateComponentModule();
}

async function refreshComponentes() {
  try {
    const data = await componenteService.getAll();
    componentesCache = Array.isArray(data) ? data : [];
  } catch (error) {
    componentesCache = [];
  }
  updateComponentModule();
}

async function handleCreateComponent(payload, form) {
  const nombre = payload.nombre?.toString().trim();
  if (
    !nombre ||
    Number.isNaN(payload.id_tipo_componente) ||
    Number.isNaN(payload.id_plan) ||
    Number.isNaN(payload.id_tipo_variacion) ||
    payload.id_tipo_componente <= 0 ||
    payload.id_plan <= 0 ||
    payload.id_tipo_variacion <= 0
  ) {
    formState = {
      loading: false,
      error: "Completá todos los campos obligatorios.",
      success: null,
    };
    updateComponentModule();
    return;
  }

  formState = { loading: true, error: null, success: null };
  updateComponentModule();

  try {
    const created = await componenteService.create({ ...payload, nombre });
    formState = {
      loading: false,
      error: null,
      success: "Componente creado correctamente.",
    };
    if (form) {
      form.reset();
    }
    if (created?.id_componente) {
      setComponentView("list");
      await loadComponentDetail(created.id_componente);
    }
    await refreshComponentes();
  } catch (error) {
    formState = {
      loading: false,
      error: "No fue posible crear el componente.",
      success: null,
    };
  }

  updateComponentModule();
}

function handleApiBaseChange() {
  const newValue = apiBaseInput.value.trim() || "/api";
  apiClient.setBaseUrl(newValue);
  localStorage.setItem("proodos:apiBase", newValue);
  renderSections();
}

apiBaseInput.value = apiClient.baseUrl || "/api";

reloadButton.addEventListener("click", handleApiBaseChange);
apiBaseInput.addEventListener("change", handleApiBaseChange);

renderSections();
