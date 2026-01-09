import { useState, useEffect } from "react";
import HousingTable from "./HousingTable";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import HousingToolBar from "./HousingToolBar";
import HousingForm from "./HousingForm";
import useStore from "../../zustand/store";
import { NavLink } from "react-router-dom";
import "./Housing.css";

export default function HousingHome() {
  const housingRecords = useStore((state) => state.housingRecords);
  const fetchHousingRecords = useStore((state) => state.fetchHousingRecords);

  // Filters / search
  const [year, setYear] = useState("");
  const [building, setBuilding] = useState("");
  const [search, setSearch] = useState("");

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Year / Building options
  const yearOptions = Array.from(
    new Set(
      housingRecords.map((r) => new Date(r.month_date).getFullYear())
    )
  ).sort((a, b) => b - a);

  const buildingOptions = Array.from(
    new Set(housingRecords.map((r) => r.building_name))
  ).sort();

  // Filtered records
  const filteredRecords = housingRecords.filter((r) => {
    const date = r.month_date ? new Date(r.month_date) : null;
    if (year && date && date.getFullYear() !== Number(year)) return false;
    if (building && r.building_name !== building) return false;
    if (search) {
      const term = search.toLowerCase();
      const combined = `${r.building_name ?? ""} ${r.notes ?? ""}`.toLowerCase();
      if (!combined.includes(term)) return false;
    }
    return true;
  });

  // Fetch records on mount
  useEffect(() => {
    fetchHousingRecords();
  }, [fetchHousingRecords]);

  return (
    <div className="hub-container">
      <DepartmentHeader
        title="North Campus Housing"
        actions={
          <>
            <NavLink to="/housing" className={({ isActive }) => isActive ? "active" : ""}>
              Data Entry
            </NavLink>
            <NavLink to="/housing/reports" className={({ isActive }) => isActive ? "active" : ""}>
              Reports
            </NavLink>
          </>
        }
      />

      {/* Toolbar */}
      <div className="housing-toolbar">
        <HousingToolBar
          filters={{
            year: { label: "Year", options: yearOptions, value: year, onChange: setYear },
            building: { label: "Building", options: buildingOptions, value: building, onChange: setBuilding },
          }}
          search={{ value: search, onChange: setSearch }}
          onAdd={() => { setEditingRecord(null); setShowForm(true); }}
        />
      </div>

      {/* Table */}
      <HousingTable
        records={filteredRecords}
        onEdit={(row) => { setEditingRecord(row); setShowForm(true); }}
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
