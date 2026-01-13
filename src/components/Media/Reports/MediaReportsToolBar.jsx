import React from "react";
import "../../../styles/toolbar.css";

export default function MediaReportsToolBar({
  year,
  setYear,
  platform,
  setPlatform,
  search,
  setSearch,
  activeReport,
  setActiveReport,
  YEAR_OPTIONS = [],
  PLATFORM_OPTIONS = [],
  onClear,
}) {
  // --- Report type options ---
  const reportOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "newsletter", label: "Newsletter" },
    { value: "audience-growth", label: "Audience Growth" },
  ];

  return (
    <div className="toolbar-container">
      {/* Left side filters */}
      <div className="toolbar-left">
        {/* Report type */}
        <div className="filter-group">
          <label>Report:</label>
          <select value={activeReport} onChange={(e) => setActiveReport(e.target.value)}>
            {reportOptions.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* Year filter */}
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

        {/* Platform filter */}
        <div className="filter-group">
          <label>Platform:</label>
          <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
            <option value="">All</option>
            {PLATFORM_OPTIONS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Search filter */}
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

      {/* Right side: Clear button */}
      <div className="toolbar-right">
        <button className="clear-button" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
}
