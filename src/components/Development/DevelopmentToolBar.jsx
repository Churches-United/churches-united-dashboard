import React from "react";
import "../../../styles/toolbar.css";

export default function DevelopmentToolbar({
  activeTable,
  setActiveTable,
  tableData = {},
  filters,
  setFilters,
  onClear,
}) {
  const tableOptions = [
    { value: "donors", label: "Donors" },
    { value: "donations", label: "Donations" },
    { value: "events", label: "Events" },
  ];

  // Helper to compute unique filter options for a given field
  const getOptions = (field) => {
    if (!tableData[activeTable]) return [];
    return Array.from(
      new Set(tableData[activeTable].map((item) => item[field]).filter(Boolean))
    ).sort();
  };

  return (
    <div className="toolbar-container development">
      {/* Left side filters */}
      <div className="toolbar-left">
        {/* Table selector */}
        <div className="filter-group">
          <label>Table:</label>
          <select
            value={activeTable}
            onChange={(e) => setActiveTable(e.target.value)}
          >
            {tableOptions.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional filters based on active table */}
        {activeTable === "donors" && (
          <>
            <div className="filter-group">
              <label>Donor Type:</label>
              <select
                value={filters.donorType || ""}
                onChange={(e) =>
                  setFilters({ ...filters, donorType: e.target.value })
                }
              >
                <option value="">All</option>
                {getOptions("donorType").map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Search:</label>
              <input
                type="text"
                placeholder="Search donors..."
                value={filters.search || ""}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>
          </>
        )}

        {activeTable === "donations" && (
          <>
            <div className="filter-group">
              <label>Year:</label>
              <select
                value={filters.year || ""}
                onChange={(e) =>
                  setFilters({ ...filters, year: e.target.value })
                }
              >
                <option value="">All</option>
                {getOptions("year").map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Search:</label>
              <input
                type="text"
                placeholder="Search donations..."
                value={filters.search || ""}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>
          </>
        )}

        {activeTable === "events" && (
          <>
            <div className="filter-group">
              <label>Event Type:</label>
              <select
                value={filters.eventType || ""}
                onChange={(e) =>
                  setFilters({ ...filters, eventType: e.target.value })
                }
              >
                <option value="">All</option>
                {getOptions("eventType").map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Search:</label>
              <input
                type="text"
                placeholder="Search events..."
                value={filters.search || ""}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>
          </>
        )}
      </div>

      {/* Right side clear button */}
      <div className="toolbar-right">
        <button className="clear-button" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  );
}
