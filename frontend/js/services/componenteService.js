export class ComponenteService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  getAll() {
    return this.apiClient.get("/componentes");
  }

  getById(id) {
    return this.apiClient.get(`/componentes/${id}`);
  }

  create(payload) {
    return this.apiClient.post("/componentes", payload);
  }
}
