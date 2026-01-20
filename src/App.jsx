import { useEffect, useState } from "react";
import CountrySelector from "./components/CountrySelector";
import LoadingSpinner from "./components/LoadingSpinner";
import NewsCard from "./components/NewsCard";
import FilterPanel from "./components/FilterPanel";

// Backend API endpoint
const API_BASE_URL = "http://localhost:5000/api";

function App() {
  // State management
  const [selectedCountry, setSelectedCountry] = useState("us");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sources, setSources] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  
  // Filter state with sensible defaults
  const [filters, setFilters] = useState({
    country: "us",
    category: "",
    language: "en",
    sources: "",
    from: "",
    to: "",
    q: ""
  });

  // Load available news sources for the selected country
  const fetchSources = async (country, language = 'en') => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/sources?country=${country}&language=${language}`
      );
      const data = await response.json();
      if (data.status === 'ok') {
        setSources(data.sources || []);
      }
    } catch (error) {
      console.error("Failed to load sources:", error);
    }
  };

  // Main function to fetch news articles
  const fetchNews = async (filterParams) => {
    setLoading(true);
    setError(null);

    try {
      // Create query string from filter parameters
      const queryParams = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value && value !== '') {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(`${API_BASE_URL}/news?${queryParams}`);
      const data = await response.json();

      // Handle API errors
      if (data.error) {
        throw new Error(data.message || data.error);
      }

      setNews(data.articles || []);
      setTotalResults(data.totalResults || 0);
    } catch (error) {
      setError(error.message);
      setNews([]);
      console.error("News fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle country selection changes
  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    const updatedFilters = { ...filters, country: countryCode };
    setFilters(updatedFilters);
    fetchNews(updatedFilters);
    // Also update sources for the new country
    fetchSources(countryCode, filters.language);
  };

  // Update filters without applying them immediately
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply the current filters and fetch news
  const handleApplyFilters = (appliedFilters) => {
    fetchNews(appliedFilters);
    // Update sources if country changed
    if (appliedFilters.country !== filters.country) {
      fetchSources(appliedFilters.country, appliedFilters.language);
    }
  };

  // Load initial data when component mounts
  useEffect(() => {
    fetchNews(filters);
    fetchSources(filters.country, filters.language);
  }, []);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">
            Global News Hub
          </h1>
          <p className="text-lg text-base-content/70">
            Stay updated with the latest headlines from around the world
          </p>
        </header>

        {/* Country selection component */}
        <CountrySelector
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
        />

        {/* News filtering options */}
        <FilterPanel
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onApplyFilters={handleApplyFilters}
          sources={sources}
        />

        {/* Show results count when not loading */}
        {!loading && !error && (
          <div className="mb-4 text-sm text-base-content/70">
            {totalResults > 0 ? (
              <span>Found {totalResults.toLocaleString()} articles</span>
            ) : (
              <span>No articles found with current filters</span>
            )}
          </div>
        )}

        {/* Error message display */}
        {error && (
          <div className="alert alert-error mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Error: {error}</span>
          </div>
        )}

        {/* Main content area */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* News articles grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article, index) => (
                <NewsCard key={`${article.url}-${index}`} article={article} />
              ))}
            </div>

            {/* Show message when no articles found */}
            {!loading && news.length === 0 && !error && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-semibold mb-2">No News Articles Found</h3>
                <p className="text-base-content/70">
                  Try adjusting your filters or selecting a different country to see more results
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
