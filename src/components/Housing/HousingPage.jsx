import { useState, useEffect } from "react";
import HousingTable from "./HousingTable";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import HousingToolBar from "./HousingToolBar";
import HousingForm from "./HousingForm";
import useStore from "../../zustand/store";
import { NavLink } from "react-router-dom";
import "./Housing.css";

export default function HousingPage() {
  const housingRecords = useStore((state) => state.housingRecords);
  const fetchHousingRecords = useStore((state) => state.fetchHousingRecords);

  // Filter/search state
  const [year, setYear] = useState("");
  const [building, setBuilding] = useState("");
  const [search, setSearch] = useState("");

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Fetch records once
  useEffect(() => {
    fetchHousingRecords();
  }, [fetchHousingRecords]);

  // Clear filters function
  const handleClearFilters = () => {
    setYear("");
    setBuilding("");
    setSearch("");
  };

  // Filtered records
  const filteredRecords = housingRecords.filter((r) => {
    const date = r.month_date ? new Date(r.month_date) : null;
    if (year && date && date.getFullYear() !== Number(year)) return false;
    if (building && r.building_name !== building) return false;
    if (search) {
      const term = search.toLowerCase();
      const combined = `${r.building_name ?? ""} ${
        r.notes ?? ""
      }`.toLowerCase();
      if (!combined.includes(term)) return false;
    }
    return true;
  });

  return (
    <div className="hub-container housing">
      <DepartmentHeader
        title="North Campus Housing"
        actions={
          <>
            <NavLink
              to="/housing/data"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Department Home
            </NavLink>
            <NavLink
              to="/housing/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Reports
            </NavLink>
          </>
        }
      />
      {/* todo - toolbar scale to make sense on page */}
      <div className="toolbar-wrapper volunteer">
        {/* Toolbar */}
        <HousingToolBar
          year={year}
          setYear={setYear}
          building={building}
          setBuilding={setBuilding}
          search={search}
          setSearch={setSearch}
          onClear={handleClearFilters}
        />

        <div className="toolbar-action-button">
          <button
            onClick={() => {
              setEditingRecord(null);
              setShowForm(true);
            }}
          >
            Add Housing Record
          </button>
        </div>
      </div>

      {/* Table */}
      <HousingTable
        records={filteredRecords}
        onEdit={(row) => {
          setEditingRecord(row);
          setShowForm(true);
        }}
      />

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <HousingForm
              record={editingRecord}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
