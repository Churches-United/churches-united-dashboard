import { useState, useEffect } from "react";
import useStore from "../../zustand/store";
import "../../styles/toolbar.css";

export default function OutreachToolbar({ filters = {}, onFilterChange }) {
  const volunteers = useStore((state) => state.volunteers);
  const engagements = useStore((state) => state.engagements);

  const [selectedVolunteer, setSelectedVolunteer] = useState(
    filters.volunteerId || ""
  );
  const [selectedLocation, setSelectedLocation] = useState(
    filters.location || ""
  );
  const [selectedYear, setSelectedYear] = useState(filters.year || "");
  const [search, setSearch] = useState(filters.search || "");

  // Dynamically generate options
  const volunteerOptions = volunteers.map((v) => ({ id: v.id, name: v.name }));
  const locationOptions = Array.from(
    new Set(engagements.map((e) => e.location))
  ).sort();
  const yearOptions = Array.from(
    new Set(engagements.map((e) => new Date(e.event_date).getFullYear()))
  ).sort((a, b) => b - a);

  // Trigger onFilterChange whenever any filter changes
  useEffect(() => {
    onFilterChange({
      volunteerId: selectedVolunteer,
      location: selectedLocation,
      year: selectedYear,
      search,
    });
  }, [selectedVolunteer, selectedLocation, selectedYear, search]);

  const handleClear = () => {
    setSelectedVolunteer("");
    setSelectedLocation("");
    setSelectedYear("");
    setSearch("");
  };

  return (
    <div className="toolbar-container">
      <div className="toolbar-left">
        {/* Year Filter */}
        <div className="filter-group">
          <label>Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Volunteer Filter */}
        <div className="filter-group">
          <label>Volunteer:</label>
          <select
            value={selectedVolunteer}
            onChange={(e) => setSelectedVolunteer(e.target.value)}
          >
            <option value="">All</option>
            {volunteerOptions.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="filter-group">
          <label>Location:</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">All</option>
            {locationOptions.map((loc) => (
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

      {/* Optional Clear Filters button */}
      <div className="toolbar-right">
        <button
          onClick={() => {
            setSelectedYear("");
            setSelectedVolunteer("");
            setSelectedLocation("");
            setSearch("");
          }}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
