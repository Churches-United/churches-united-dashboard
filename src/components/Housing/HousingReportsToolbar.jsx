import React, { useEffect } from "react";

export default function HousingReportsToolbar({
  reportData,
  year,
  setYear,
  building,
  setBuilding,
  search,
  setSearch,
}) {
  // Compute options dynamically from reportData
  const yearOptions = Array.from(
    new Set(
      reportData
        .map((r) => r.month_start && new Date(r.month_start).getFullYear())
        .filter(Boolean)
    )
  ).sort((a, b) => b - a);

  const buildingOptions = Array.from(
    new Set(reportData.map((r) => r.building_name).filter(Boolean))
  ).sort();

  return (
    <div className="table-toolbar">
      {/* Year Filter */}
      <div className="filter-group">
        <label>Year:</label>
        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">All</option>
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Building Filter */}
      <div className="filter-group">
        <label>Building:</label>
        <select value={building} onChange={(e) => setBuilding(e.target.value)}>
          <option value="">All</option>
          {buildingOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      {/* Search */}
      <div className="filter-group">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
