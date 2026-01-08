import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../zustand/store";
import HousingMonthlySummary from "./HousingMonthlySummary.jsx";
import HousingMonthlyTable from "./HousingMonthlyTable.jsx";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import HousingReportsToolbar from "./HousingReportsToolbar";

export default function HousingReports() {
  const fetchMonthlyHousing = useStore(
    (state) => state.fetchHousingMonthlyReport
  );
  const fetchSummaryHousing = useStore(
    (state) => state.fetchHousingMonthlySummary
  );
  const reportData = useStore((state) => state.housingMonthlyReport);
  const loadingHousingReports = useStore(
    (state) => state.loadingHousingReports
  );

  // Toolbar state
  const [year, setYear] = useState("");
  const [building, setBuilding] = useState("");
  const [search, setSearch] = useState("");

  const [activeTab, setActiveTab] = useState("table");

  // Fetch data once on mount
  useEffect(() => {
    fetchMonthlyHousing();
    fetchSummaryHousing();
  }, [fetchMonthlyHousing, fetchSummaryHousing]);

  // Filtered records based on toolbar selections
  const filteredRecords = reportData.filter((r) => {
    const date = r.month_start ? new Date(r.month_start) : null;

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

      {/* Toolbar */}
      <HousingReportsToolbar
        reportData={reportData}
        year={year}
        setYear={setYear}
        building={building}
        setBuilding={setBuilding}
        search={search}
        setSearch={setSearch}
      />

      {/* Tabs */}
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
        ) : filteredRecords.length === 0 && activeTab === "table" ? (
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
