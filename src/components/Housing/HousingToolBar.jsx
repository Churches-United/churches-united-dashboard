import useStore from "../../zustand/store";

export default function HousingToolBar({
  year,
  setYear,
  building,
  setBuilding,
  search,
  setSearch,
  onClear,
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
    <div className="hub-container housing">
      <div className="toolbar-container housing">
        {/* Left side: filters */}
        <div className="toolbar-left">
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
