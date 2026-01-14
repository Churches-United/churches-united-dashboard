import React from "react";
import "./Housing.css";

export default function HousingReportsToolbar({
  year,
  setYear,
  building,
  setBuilding,
  search,
  setSearch,
  activeReport,
  setActiveReport,
  reportData = [],
  onClear,
}) {
  // Compute options dynamically
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

  const reportOptions = [
    { value: "table", label: "Monthly Table" },
    { value: "summary", label: "Summary" },
  ];

  return (
    <div className="hub-container housing">
      <div className="toolbar-container housing">
        {/* Left side filters */}
        <div className="toolbar-left">
          {/* Report dropdown */}
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

          {/* Year filter */}
          <div className="filter-group">
            <label>Year:</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              disabled={activeReport === "summary"} // optional: disable if not needed
            >
              <option value="">All</option>
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>

          {/* Building filter */}
          <div className="filter-group">
            <label>Building:</label>
            <select
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              disabled={activeReport === "summary"} // optional
            >
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
            <label>Search:</label>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={activeReport === "summary"} // optional
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
    </div>
  );
}
