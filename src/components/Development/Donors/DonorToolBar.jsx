import React from "react";
import "../DevelopmentToolBar.css";

export default function DevelopmentToolbar({
  tableData = [],
  filters = {},
  setFilters,
  rightButtons = [],
}) {
  // Compute options dynamically from tableData
  const nameOptions = Array.from(
    new Set(tableData.map((r) => r.name).filter(Boolean))
  ).sort();
  const typeOptions = Array.from(
    new Set(tableData.map((r) => r.type).filter(Boolean))
  ).sort();

  return (
    <div className="toolbar-container donor">
      <div className="toolbar-left">
        {/* Name filter */}
        <div className="filter-group">
          <label>Name:</label>
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

        {/* Type filter */}
        <div className="filter-group">
          <label>Type:</label>
          <select
            value={filters.type || ""}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">All</option>
            {typeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        {/*clear buttons */}
        {rightButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={btn.onClick}
            className="clear-button"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
