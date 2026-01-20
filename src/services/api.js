const API_BASE_URL = "http://localhost:5000/api";

class ApiService {
  async fetchNews(filters = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        queryParams.append(key, value);
      }
    });

    const response = await fetch(`${API_BASE_URL}/news?${queryParams}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.message || data.error);
    }

    return data;
  }

  async fetchSources(country, language = 'en', category = '') {
    const queryParams = new URLSearchParams();
    if (country) queryParams.append('country', country);
    if (language) queryParams.append('language', language);
    if (category) queryParams.append('category', category);

    const response = await fetch(`${API_BASE_URL}/sources?${queryParams}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.message || data.error);
    }

    return data;
  }

  async fetchStoredNews(filters = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        queryParams.append(key, value);
      }
    });

    const response = await fetch(`${API_BASE_URL}/news/stored?${queryParams}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.message || data.error);
    }

    return data;
  }

  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  }
}

export default new ApiService();