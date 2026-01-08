import { useState } from "react";
import { NavLink } from "react-router-dom";
import HousingForm from "./HousingForm";
import HousingTable from "./HousingTable";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import TableToolBar from "../DesignComponents/TableToolBar/TableToolBar";
import useStore from "../../zustand/store";

export default function HousingHome() {
  const [editingRecord, setEditingRecord] = useState(null);

  const [year, setYear] = useState("");
  const [building, setBuilding] = useState("");
  const [search, setSearch] = useState("");

  const housingRecords = useStore((state) => state.housingRecords);

  // Extract unique years and buildings for the dropdowns
  const yearOptions = Array.from(
    new Set(housingRecords.map((r) => new Date(r.month_date).getFullYear()))
  ).sort((a, b) => b - a); // descending

  const buildingOptions = Array.from(
    new Set(housingRecords.map((r) => r.building_name))
  ).sort();

  return (
    <div className="hub-container">
      <DepartmentHeader
        title="North Campus Housing"
        actions={
          <>
            <NavLink
              to="/housing"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Data Entry
            </NavLink>
            <NavLink to="/housing/reports">Reports</NavLink>
          </>
        }
      />

      <TableToolBar
        filters={{
          year: {
            label: "Year",
            options: yearOptions,
            value: year,
            onChange: setYear,
          },
          building: {
            label: "Building",
            options: buildingOptions,
            value: building,
            onChange: setBuilding,
          },
        }}
        search={{ value: search, onChange: setSearch }}
      />

      <HousingForm
        editingRecord={editingRecord}
        setEditingRecord={setEditingRecord}
      />

      <HousingTable
        onEdit={setEditingRecord}
        year={year}
        building={building}
        search={search}
      />

      <section className="hub-section">
        <h3>Quick Overview</h3>
        <p>Summary metrics / graphs / cards coming soon.</p>
      </section>
    </div>
  );
}
