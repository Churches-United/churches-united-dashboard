import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../zustand/store";
import HousingMonthlySummary from "./HousingMonthlySummary.jsx";
import HousingMonthlyTable from "./HousingMonthlyTable.jsx";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import TableToolbar from "../DesignComponents/TableToolBar/TableToolBar";

export default function HousingReports() {
  const fetchMonthlyHousing = useStore(
    (state) => state.fetchHousingMonthlyReport
  );
  const fetchSummaryHousing = useStore(
    (state) => state.fetchHousingMonthlySummary
  );
  const housingRecords = useStore((state) => state.housingRecords);
  const loadingHousingReports = useStore(
    (state) => state.loadingHousingReports
  );

  // Toolbar state
  const [year, setYear] = useState("");
  const [building, setBuilding] = useState("");
  const [search, setSearch] = useState("");

  // Tabs
  const [activeTab, setActiveTab] = useState("table");

  // Fetch data on mount
  useEffect(() => {
    fetchMonthlyHousing();
    fetchSummaryHousing();
  }, [fetchMonthlyHousing, fetchSummaryHousing]);

  // Extract unique years and buildings for toolbar dropdowns
  const yearOptions = Array.from(
    new Set(
      housingRecords
        .map((r) => r.month_date && new Date(r.month_date).getFullYear())
        .filter(Boolean)
    )
  ).sort((a, b) => b - a);

  const buildingOptions = Array.from(
    new Set(housingRecords.map((r) => r.building_name))
  ).sort();

  // Filtered records based on toolbar
  const filteredRecords =
    housingRecords && housingRecords.length > 0
      ? housingRecords.filter((r) => {
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
        })
      : [];

  return (
    <div className="hub-container">
      <DepartmentHeader
        title="North Campus Housing"
        actions={
          <>
            <NavLink
              to="/housing"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Data Entry
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

      <TableToolbar
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

      <div style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <button
            className={activeTab === "table" ? "primary" : "secondary"}
            onClick={() => setActiveTab("table")}
          >
            Table
          </button>
          <button
            className={activeTab === "summary" ? "primary" : "secondary"}
            onClick={() => setActiveTab("summary")}
          >
            Summary
          </button>
        </div>

        {loadingHousingReports ? (
          <p>Loading report…</p>
        ) : filteredRecords.length === 0 ? (
          <p>No records match the current filters.</p>
        ) : (
          <>
            {activeTab === "table" && (
              <HousingMonthlyTable records={filteredRecords} />
            )}
            {activeTab === "summary" && <HousingMonthlySummary />}
          </>
        )}
      </div>
    </div>
  );
}
