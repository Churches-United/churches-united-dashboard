import React from "react";
import './TableToolBar.css';

export default function TableToolbar({ filters = {}, search = {} }) {
  return (
    <div className="table-toolbar">
      {Object.entries(filters).map(([key, filter]) => (
        <div key={key} className="filter-group">
          <label>{filter.label}:</label>
          <select
            value={filter.value}
            onChange={(e) => filter.onChange(filter.type === "number" ? +e.target.value : e.target.value)}
          >
            <option value="">All</option>
            {filter.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}

      {search.value !== undefined && (
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search..."
            value={search.value}
            onChange={(e) => search.onChange(e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
