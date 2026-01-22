export class ComponentFormRenderer {
  constructor({ id, title, description }) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  render({
    onSubmit,
    loading = false,
    error = null,
    success = null,
  } = {}) {
    const section = document.createElement("section");
    section.className = "section-card";
    section.id = this.id;

    const header = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = this.title;

    const meta = document.createElement("span");
    meta.className = "section-meta";
    meta.textContent = loading
      ? "Enviando datos..."
      : "Completa la información requerida.";

    title.appendChild(meta);
    header.appendChild(title);

    if (this.description) {
      const description = document.createElement("p");
      description.className = "section-meta";
      description.textContent = this.description;
      header.appendChild(description);
    }

    section.appendChild(header);

    if (error || success) {
      const status = document.createElement("div");
      status.className = `status-banner ${error ? "status-banner--error" : ""}`;
      status.textContent = error || success;
      section.appendChild(status);
    }

    const form = document.createElement("form");
    form.className = "form-grid";
    form.noValidate = true;

    const fields = [
      {
        id: "id_tipo_componente",
        label: "ID tipo de componente",
        type: "number",
        placeholder: "Ej: 1",
        required: true,
        min: 1,
      },
      {
        id: "id_plan",
        label: "ID plan",
        type: "number",
        placeholder: "Ej: 2",
        required: true,
        min: 1,
      },
      {
        id: "id_tipo_variacion",
        label: "ID tipo de variación",
        type: "number",
        placeholder: "Ej: 3",
        required: true,
        min: 1,
      },
      {
        id: "nombre",
        label: "Nombre",
        type: "text",
        placeholder: "Ej: Hero principal",
        required: true,
      },
    ];

    fields.forEach((field) => {
      const wrapper = document.createElement("div");
      wrapper.className = "form-field";

      const label = document.createElement("label");
      label.htmlFor = field.id;
      label.textContent = field.label;

      const input = document.createElement("input");
      input.id = field.id;
      input.name = field.id;
      input.type = field.type;
      input.placeholder = field.placeholder;
      input.required = field.required;
      if (field.min) {
        input.min = field.min;
      }
      if (loading) {
        input.disabled = true;
      }

      wrapper.appendChild(label);
      wrapper.appendChild(input);
      form.appendChild(wrapper);
    });

    const actions = document.createElement("div");
    actions.className = "form-actions";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.className = "primary-button";
    submitButton.textContent = loading ? "Creando..." : "Crear componente";
    submitButton.disabled = loading;

    actions.appendChild(submitButton);
    form.appendChild(actions);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (loading) {
        return;
      }

      const formData = new FormData(form);
      const payload = {
        id_tipo_componente: Number(formData.get("id_tipo_componente")),
        id_plan: Number(formData.get("id_plan")),
        id_tipo_variacion: Number(formData.get("id_tipo_variacion")),
        nombre: formData.get("nombre")?.toString().trim(),
      };

      if (onSubmit) {
        onSubmit(payload, form);
      }
    });

    section.appendChild(form);
    return section;
  }
}
