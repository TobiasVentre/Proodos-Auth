export class LandingService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  getAll() {
    return this.apiClient.get("/landings");
  }
}
