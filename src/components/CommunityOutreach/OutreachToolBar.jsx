import { useState, useEffect } from "react";
import useStore from "../../zustand/store";
import { FaPlus } from "react-icons/fa";
import "./CommunityOutreach.css";

export default function OutreachToolbar({
  filters = {},
  onFilterChange,
  onAddVolunteer,
  onAddEngagement,
}) {
  const volunteers = useStore((state) => state.volunteers);
  const engagements = useStore((state) => state.engagements);

  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [search, setSearch] = useState("");

  // Dynamically generate options
  const volunteerOptions = volunteers.map((v) => ({ id: v.id, name: v.name }));
  const locationOptions = Array.from(
    new Set(engagements.map((e) => e.location))
  ).sort();
  const yearOptions = Array.from(
    new Set(engagements.map((e) => new Date(e.event_date).getFullYear()))
  ).sort((a, b) => b - a);

  // Handle filter changes
  useEffect(() => {
    onFilterChange({
      volunteerId: selectedVolunteer,
      location: selectedLocation,
      year: selectedYear,
      search,
    });
  }, [selectedVolunteer, selectedLocation, selectedYear, search]);

  return (
    <div className="outreach-toolbar">
      {/* Left side filters */}
      <div className="toolbar-left">
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

      {/* Right side: Action buttons */}
      <div className="toolbar-right">
        <button className="primary" onClick={onAddVolunteer}>
          <FaPlus style={{ marginRight: "4px" }} /> Add Volunteer
        </button>
        <button className="primary" onClick={onAddEngagement}>
          <FaPlus style={{ marginRight: "4px" }} /> Add Engagement
        </button>
      </div>
    </div>
  );
}
