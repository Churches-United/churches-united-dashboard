import React from "react";

export default function DevelopmentReportsToolbar({
  category,
  setCategory,
  report,
  setReport,
  reportOptions = [],
  filters,
  setFilters,
  yearOptions = [],
  nameOptions = [],
  onClear,
}) {
  return (
    <div className="toolbar-container development">
      <div className="toolbar-left">
        {/* ---------------- Category ---------------- */}
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

        {/* ---------------- Report ---------------- */}
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

        {/* ---------------- Year ---------------- */}
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

        {/* ---------------- Name / Event ---------------- */}
        <div className="filter-group">
          <label>Name / Event</label>
          <select
            value={filters.name || ""}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          >
            <option value="">All</option>
            {nameOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* ---------------- Search ---------------- */}
        <div className="filter-group">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search..."
            value={filters.search || ""}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        {/* ---------------- Clear ---------------- */}
        <div className="filter-group">
          <button className="clear-button" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
