export class ApiClient {
  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const payload = await response.json();
    return payload?.data ?? payload;
  }

  async post(endpoint, body) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const payload = await response.json();
    return payload?.data ?? payload;
  }
}
