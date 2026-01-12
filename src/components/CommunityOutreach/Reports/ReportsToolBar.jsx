import React from "react";
import "../CommunityOutreach.css";

export default function ReportsToolbar({
  year,
  setYear,
  location,
  setLocation,
  search,
  setSearch,
  activeReport,
  setActiveReport,
  YEAR_OPTIONS = [],
  LOCATION_OPTIONS = [],
}) {
  const reportOptions = [
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "by-location", label: "By Location" },
    { value: "monthly-by-location", label: "Monthly by Location" },
  ];

  // Handler to reset all filters
  const handleClearFilters = () => {
    setYear("");
    setLocation("");
    setSearch("");
    setActiveReport("weekly"); // default report
  };

  return (
    <div className="toolbar-container">
      {/* Left side filters including Report */}
      <div className="toolbar-left">
        {/* Report Type */}
        <div className="filter-group">
          <label>Report:</label>
          <select
            value={activeReport}
            onChange={(e) => setActiveReport(e.target.value)}
          >
            {reportOptions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div className="filter-group">
          <label>Year:</label>
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">All</option>
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="filter-group">
          <label>Location:</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All</option>
            {LOCATION_OPTIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Search Filter */}
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Right side: Clear Filters button */}
      <div className="toolbar-right">
        <button className="secondary clear-button" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}
