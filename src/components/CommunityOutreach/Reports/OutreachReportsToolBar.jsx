import React from "react";
import "../../../styles/toolbar.css";

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
  onClear,
}) {
  const reportOptions = [
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "by-location", label: "By Location" },
    { value: "monthly-by-location", label: "Monthly by Location" },
  ];

  return (
    <div className="toolbar-container">
      {/* Left side filters */}
      <div className="toolbar-left">
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

        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
          <button className="clear-button" onClick={onClear}>
            Clear
          </button>
      </div>
    </div>
  );
}

