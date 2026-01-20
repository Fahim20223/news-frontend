import React, { useState } from "react";

// List of supported countries with their flags
const countries = [
  { code: "us", name: "United States", flag: "🇺🇸" },
  { code: "gb", name: "United Kingdom", flag: "🇬🇧" },
  { code: "ca", name: "Canada", flag: "🇨🇦" },
  { code: "au", name: "Australia", flag: "🇦🇺" },
  { code: "de", name: "Germany", flag: "🇩🇪" },
  { code: "jp", name: "Japan", flag: "🇯🇵" },
  { code: "in", name: "India", flag: "🇮🇳" },
  { code: "br", name: "Brazil", flag: "🇧🇷" },
  { code: "mx", name: "Mexico", flag: "🇲🇽" },
  { code: "it", name: "Italy", flag: "🇮🇹" },
  { code: "es", name: "Spain", flag: "🇪🇸" },
  { code: "nl", name: "Netherlands", flag: "🇳🇱" },
  { code: "se", name: "Sweden", flag: "🇸🇪" },
  { code: "no", name: "Norway", flag: "🇳🇴" },
];

const CountrySelector = ({ selectedCountry, onCountryChange }) => {
  const [viewMode, setViewMode] = useState("dropdown"); // Default to dropdown view

  // Find the currently selected country data
  const selectedCountryData = countries.find((c) => c.code === selectedCountry);

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold">Choose Your Country</h2>
        {/* Toggle between dropdown and card view */}
        <div className="tabs tabs-boxed">
          <button
            className={`tab ${viewMode === "dropdown" ? "tab-active" : ""}`}
            onClick={() => setViewMode("dropdown")}
          >
            Dropdown
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`tab ${viewMode === "cards" ? "tab-active" : ""}`}
          >
            Cards
          </button>
        </div>
      </div>

      {viewMode === "dropdown" ? (
        // Dropdown selector view
        <div className="form-control w-full max-w-xs">
          <select
            className="select select-bordered w-full"
            value={selectedCountry}
            onChange={(e) => onCountryChange(e.target.value)}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        // Card grid view
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => onCountryChange(country.code)}
              className={`card card-compact bg-base-100 shadow-md hover:shadow-lg transition-all duration-200 ${
                selectedCountry === country.code ? "ring-2 ring-primary" : ""
              }`}
            >
              <div className="card-body items-center text-center p-4">
                <div className="text-3xl mb-2">{country.flag}</div>
                <div className="text-sm font-medium">{country.name}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountrySelector;
