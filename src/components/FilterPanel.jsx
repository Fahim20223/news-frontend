import React, { useState, useEffect } from 'react';

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'business', label: 'Business' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'general', label: 'General' },
  { value: 'health', label: 'Health' },
  { value: 'science', label: 'Science' },
  { value: 'sports', label: 'Sports' },
  { value: 'technology', label: 'Technology' }
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'zh', label: 'Chinese' }
];

const FilterPanel = ({ filters, onFiltersChange, onApplyFilters, sources = [] }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      country: 'us',
      category: '',
      language: 'en',
      sources: '',
      from: '',
      to: '',
      q: ''
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
    onApplyFilters(resetFilters);
  };

  const formatDateForInput = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  return (
    <div className="bg-base-100 rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Search Query */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Search Keywords</span>
            </label>
            <input
              type="text"
              placeholder="Enter keywords..."
              className="input input-bordered w-full"
              value={localFilters.q || ''}
              onChange={(e) => handleFilterChange('q', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={localFilters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Language</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={localFilters.language || 'en'}
                onChange={(e) => handleFilterChange('language', e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sources Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Source</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={localFilters.sources || ''}
                onChange={(e) => handleFilterChange('sources', e.target.value)}
              >
                <option value="">All Sources</option>
                {sources.map((source) => (
                  <option key={source.id} value={source.id}>
                    {source.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">From Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={formatDateForInput(localFilters.from)}
                onChange={(e) => handleFilterChange('from', e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">To Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={formatDateForInput(localFilters.to)}
                onChange={(e) => handleFilterChange('to', e.target.value)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <button
              className="btn btn-primary"
              onClick={handleApply}
            >
              Apply Filters
            </button>
            <button
              className="btn btn-outline"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;