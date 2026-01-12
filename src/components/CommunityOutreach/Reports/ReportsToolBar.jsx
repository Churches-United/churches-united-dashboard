import React from "react";
import "../CommunityOutreach.css";
import { FaFilter } from "react-icons/fa";

export default function ReportsToolbar({
  year,
  setYear,
  location,
  setLocation,
  search,
  setSearch,
  activeReport,
  setActiveReport,
}) {
  // Example static options for now; can be dynamic if you have data
  const YEAR_OPTIONS = ["2026", "2025", "2024"];
  const LOCATION_OPTIONS = ["All", "Bright Sky", "Community Picnic", "Dorothy Day", "Other"];

  return (
    <div className="outreach-toolbar">
      {/* Left side: filters + search */}
      <div className="toolbar-left">
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

        {/* Location filter */}
        <div className="filter-group">
          <label>Location:</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            {LOCATION_OPTIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
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
          />
        </div>
      </div>

      {/* Right side: report tabs */}
      <div className="toolbar-right">
        <button
          className={activeReport === "weekly" ? "primary" : "secondary"}
          onClick={() => setActiveReport("weekly")}
        >
          Weekly
        </button>
        <button
          className={activeReport === "monthly" ? "primary" : "secondary"}
          onClick={() => setActiveReport("monthly")}
        >
          Monthly
        </button>
        <button
          className={activeReport === "by-location" ? "primary" : "secondary"}
          onClick={() => setActiveReport("by-location")}
        >
          By Location
        </button>
        <button
          className={activeReport === "monthly-by-location" ? "primary" : "secondary"}
          onClick={() => setActiveReport("monthly-by-location")}
        >
          Monthly by Location
        </button>
      </div>
    </div>
  );
}
