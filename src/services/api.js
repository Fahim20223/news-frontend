const API_BASE_URL = "http://localhost:5000/api";

// Service class to handle all API calls
class ApiService {
  // Fetch news articles with optional filters
  async fetchNews(filters = {}) {
    const queryParams = new URLSearchParams();
    
    // Add non-empty filter values to query string
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        queryParams.append(key, value);
      }
    });

    const response = await fetch(`${API_BASE_URL}/news?${queryParams}`);
    const data = await response.json();

    // Throw error if API returned an error
    if (data.error) {
      throw new Error(data.message || data.error);
    }

    return data;
  }

  // Get available news sources for a country/language
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

  // Fetch previously stored news from database
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

  // Check if the API server is running
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  }
}

// Export a singleton instance
export default new ApiService();