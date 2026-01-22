export class ComponentDetailRenderer {
  constructor({ id, title, description, emptyMessage }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.emptyMessage = emptyMessage;
  }

  render(component, { loading = false, error = null } = {}) {
    const section = document.createElement("section");
    section.className = "section-card";
    section.id = this.id;

    const header = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = this.title;

    const meta = document.createElement("span");
    meta.className = "section-meta";

    if (loading) {
      meta.textContent = "Cargando detalle...";
    } else if (error) {
      meta.textContent = "Error al cargar el detalle.";
    } else if (component) {
      meta.textContent = `ID ${component.id_componente ?? "-"}`;
    } else {
      meta.textContent = "Sin selección";
    }

    title.appendChild(meta);
    header.appendChild(title);

    if (this.description) {
      const description = document.createElement("p");
      description.className = "section-meta";
      description.textContent = this.description;
      header.appendChild(description);
    }

    section.appendChild(header);

    if (error) {
      const errorState = document.createElement("div");
      errorState.className = "error-state";
      errorState.textContent = error;
      section.appendChild(errorState);
      return section;
    }

    if (loading) {
      const loadingState = document.createElement("div");
      loadingState.className = "empty-state";
      loadingState.textContent = "Buscando información del componente...";
      section.appendChild(loadingState);
      return section;
    }

    if (!component) {
      const emptyState = document.createElement("div");
      emptyState.className = "empty-state";
      emptyState.textContent =
        this.emptyMessage || "Seleccioná un componente del listado.";
      section.appendChild(emptyState);
      return section;
    }

    const detailGrid = document.createElement("div");
    detailGrid.className = "detail-grid";

    const fields = [
      { label: "Nombre", value: component.nombre },
      { label: "Tipo componente", value: component.id_tipo_componente },
      { label: "Plan", value: component.id_plan },
      { label: "Variación", value: component.id_tipo_variacion },
      { label: "Estado", value: component.estado },
      { label: "Fecha creación", value: component.fecha_creacion },
      { label: "Fecha baja", value: component.fecha_baja },
    ];

    fields.forEach(({ label, value }) => {
      const item = document.createElement("div");
      item.className = "detail-item";

      const labelNode = document.createElement("span");
      labelNode.className = "detail-label";
      labelNode.textContent = label;

      const valueNode = document.createElement("span");
      valueNode.className = "detail-value";
      valueNode.textContent =
        value === undefined || value === null || value === "" ? "-" : value;

      item.appendChild(labelNode);
      item.appendChild(valueNode);
      detailGrid.appendChild(item);
    });

    section.appendChild(detailGrid);

    if (component.plan) {
      const planCard = document.createElement("div");
      planCard.className = "detail-subcard";

      const planTitle = document.createElement("h3");
      planTitle.className = "item-title";
      planTitle.textContent = "Plan asociado";
      planCard.appendChild(planTitle);

      Object.entries(component.plan).forEach(([key, value]) => {
        const planDetail = document.createElement("p");
        planDetail.className = "item-detail";
        planDetail.textContent = `${key}: ${value ?? "-"}`;
        planCard.appendChild(planDetail);
      });

      section.appendChild(planCard);
    }

    return section;
  }
}
