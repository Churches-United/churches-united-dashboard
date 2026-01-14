import React from "react";
import "../DevelopmentToolBar.css";

export default function EventsToolBar({
  tableData = [],
  filters = {},
  setFilters,
  rightButtons = [],
}) {
  // Compute dynamic options from tableData
  const nameOptions = Array.from(
    new Set(tableData.map((e) => e.name).filter(Boolean))
  ).sort();
  const typeOptions = Array.from(
    new Set(tableData.map((e) => e.type).filter(Boolean))
  ).sort();
  const venueOptions = Array.from(
    new Set(tableData.map((e) => e.venue).filter(Boolean))
  ).sort();
  const yearOptions = Array.from(
    new Set(tableData.map((e) => new Date(e.datetime).getFullYear()))
  ).sort();

  return (
    <div className="toolbar-container events">
      <div className="toolbar-left">
        {/* Name Filter */}
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
        {/* Year Filter */}
        <div className="filter-group">
          <label>Year:</label>
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
        {/* Venue Filter */}
        <div className="filter-group">
          <label>Venue:</label>
          <select
            value={filters.venue || ""}
            onChange={(e) => setFilters({ ...filters, venue: e.target.value })}
          >
            <option value="">All</option>
            {venueOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
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

        {/* Notes search */}
        <div className="filter-group">
          <label>Notes:</label>
          <input
            type="text"
            placeholder="Search notes..."
            value={filters.notes || ""}
            onChange={(e) => setFilters({ ...filters, notes: e.target.value })}
          />
        </div>

        {/* Clear button */}
        <div className="filter-group">
          <button className="clear-button" onClick={rightButtons[0]?.onClick}>
            {rightButtons[0]?.label || "Clear"}
          </button>
        </div>
      </div>
    </div>
  );
}
