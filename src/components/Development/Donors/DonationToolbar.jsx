import React from "react";
import "../DevelopmentToolBar.css";

export default function DonationToolBar({
  tableData = [],
  filters,
  setFilters,
  rightButtons = [],
}) {
  const donorOptions = Array.from(
    new Set(tableData.map((d) => d.donor_name))
  ).sort();

  return (
    <div className="toolbar-container donation">
      <div className="toolbar-left donation">
        {/* Donor dropdown */}
        <div className="filter-group">
          <label>Donor:</label>
          <select
            value={filters.donor || ""}
            onChange={(e) => setFilters({ ...filters, donor: e.target.value })}
          >
            <option value="">All</option>
            {donorOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Checkboxes */}
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={filters.notable || false}
              onChange={(e) =>
                setFilters({ ...filters, notable: e.target.checked })
              }
            />{" "}
            Notable
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.restricted || false}
              onChange={(e) =>
                setFilters({ ...filters, restricted: e.target.checked })
              }
            />{" "}
            Restricted
          </label>
        </div>

        {/* Notes search */}
        <div className="filter-group donation">
          <input
            type="text"
            placeholder="Search notes..."
            value={filters.search || ""}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        {/* Clear button */}
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
