import React from "react";

export default function DevelopmentReportsToolbar({
  activeReport = "donations-weekly",
  setActiveReport = () => {},
  tableData = { donations: [], donors: [] },
  filters = {},
  setFilters = () => {},
  onClear = () => {},
}) {
  // Define your 3 report options
  const reportOptions = [
    { value: "donations-weekly", label: "Donations Weekly" },
    { value: "donations-monthly", label: "Donations Monthly" },
    { value: "donors", label: "Donors" },
  ];

  // Helper to compute filter options
  const getOptions = (field) => {
    if (activeReport === "donors" && tableData.donors) {
      return Array.from(
        new Set(tableData.donors.map((item) => item[field]).filter(Boolean))
      ).sort();
    }
    if (
      (activeReport === "donations-weekly" ||
        activeReport === "donations-monthly") &&
      tableData.donations
    ) {
      return Array.from(
        new Set(tableData.donations.map((item) => item[field]).filter(Boolean))
      ).sort();
    }
    return [];
  };

  return (
    <div className="toolbar-container development-reports">
      <div className="toolbar-left">
        {/* Report Selector Dropdown */}
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

        {/* Filters: example Year filter */}
        {(activeReport === "donations-weekly" ||
          activeReport === "donations-monthly") && (
          <div className="filter-group">
            <label>Year:</label>
            <select
              value={filters.year || ""}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            >
              <option value="">All</option>
              {getOptions("year").map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        )}

        {activeReport === "donors" && (
          <div className="filter-group">
            <label>Donor Type:</label>
            <select
              value={filters.donorType || ""}
              onChange={(e) =>
                setFilters({ ...filters, donorType: e.target.value })
              }
            >
              <option value="">All</option>
              {getOptions("donorType").map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Search input */}
        <div className="filter-group">
          <label>Search:</label>
          <input
            type="text"
            placeholder="Search..."
            value={filters.search || ""}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
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
