import React, { useEffect, useState } from "react";
import useStore from "../../zustand/store";
import "../../styles/toolbar.css";

export default function OutreachToolbar({ filters, onFilterChange, onClear }) {
  // --- Zustand store ---
  const volunteers = useStore((state) => state.volunteers);
  const engagements = useStore((state) => state.engagements);

  // --- Local state for controlled inputs ---
  const [selectedVolunteer, setSelectedVolunteer] = useState(
    filters.volunteerId || ""
  );
  const [selectedLocation, setSelectedLocation] = useState(
    filters.location || ""
  );
  const [selectedYear, setSelectedYear] = useState(filters.year || "");
  const [search, setSearch] = useState(filters.search || "");

  // --- Generate dropdown options from store ---
  const volunteerOptions = volunteers.map((v) => ({ id: v.id, name: v.name }));
  const locationOptions = Array.from(
    new Set(engagements.map((e) => e.location))
  ).sort();
  const yearOptions = Array.from(
    new Set(engagements.map((e) => new Date(e.event_date).getFullYear()))
  ).sort((a, b) => b - a);

  // --- Sync local state if parent filters change ---
  useEffect(() => {
    setSelectedVolunteer(filters.volunteerId || "");
    setSelectedLocation(filters.location || "");
    setSelectedYear(filters.year || "");
    setSearch(filters.search || "");
  }, [filters]);

  // --- Notify parent when local state changes ---
  useEffect(() => {
    onFilterChange({
      volunteerId: selectedVolunteer,
      location: selectedLocation,
      year: selectedYear,
      search,
    });
  }, [selectedVolunteer, selectedLocation, selectedYear, search]);

  return (
    // <div className="hub-container outreach">
      <div className="toolbar-container outreach">
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

          {/* Search Filter */}
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

        {/* Clear Button */}
        <div className="toolbar-right">
          <button className="clear-button" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>
    // </div>
  );
}
