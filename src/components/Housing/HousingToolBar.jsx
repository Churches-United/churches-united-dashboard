import { FaPlus } from "react-icons/fa";
import useStore from "../../zustand/store";
import "./Housing.css";

export default function HousingToolBar({
  year,
  setYear,
  building,
  setBuilding,
  search,
  setSearch,
  onAdd,
}) {
  const housingRecords = useStore((state) => state.housingRecords);

  // derive filter options dynamically
  const yearOptions = Array.from(
    new Set(
      housingRecords
        .filter((r) => r.month_date)
        .map((r) => new Date(r.month_date).getFullYear())
    )
  ).sort((a, b) => b - a);

  const buildingOptions = Array.from(
    new Set(housingRecords.map((r) => r.building_name))
  ).sort();

  return (
    <div className="housing-toolbar">
      <div className="toolbar-left">
        {/* Year filter */}
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

        {/* Building filter */}
        <div className="filter-group">
          <label>Building:</label>
          <select
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
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
            placeholder="Search notes or building…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Right side: Add button */}
      <div className="toolbar-right">
        <button className="secondary" onClick={onAdd}>
          Add New Record
        </button>
      </div>
    </div>
  );
}
