import React from "react";
import "./DevelopmentToolBar.css";

export default function DevelopmentReportsToolbar({
  category,
  report,
  setCategory,
  setReport,
  reportOptions = [],
  filters,
  setFilters,
  onClear,
  yearOptions = [],
  nameOptions = [],
}) {
  // --- Determine if Name/Search should be disabled ---
  const disableNameSearch =
    category === "donations" && (report === "weekly" || report === "monthly");

  return (
    <div className="toolbar-container dev-report">
      <div className="toolbar-left">
        {/* Category */}
        <div className="filter-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="donations">Donations</option>
            <option value="events">Events</option>
          </select>
        </div>

        {/* Report */}
        <div className="filter-group">
          <label>Report</label>
          <select value={report} onChange={(e) => setReport(e.target.value)}>
            {reportOptions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* Year */}
        <div className="filter-group">
          <label>Year</label>
          <select
            value={filters.year || ""}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
          >
            <option value="">All</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Name / Event */}
        <div className="filter-group">
          <label>Name / Event</label>
          <select
            value={filters.name || ""}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            disabled={disableNameSearch || nameOptions.length === 0}
            style={
              disableNameSearch || nameOptions.length === 0
                ? { opacity: 0.5, cursor: "not-allowed" }
                : {}
            }
          >
            <option value="">All</option>
            {nameOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            value={filters.search || ""}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            disabled={disableNameSearch}
            style={
              disableNameSearch ? { opacity: 0.5, cursor: "not-allowed" } : {}
            }
          />
        </div>
          <button className="clear-button" onClick={onClear}>
            Clear
          </button>
      </div>
    </div>
  );
}
