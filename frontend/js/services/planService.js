export class PlanService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  getAll() {
    return this.apiClient.get("/planes");
  }
}
