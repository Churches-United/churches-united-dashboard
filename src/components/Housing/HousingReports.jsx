import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  currencyFormatter,
  numberFormatter,
  formatPercent,
} from "../../styles/formatters.js";
import useStore from "../../zustand/store";
import HousingMonthlySummary from "./HousingMonthlySummary.jsx";
import HousingMonthlyTable from "./HousingMonthlyTable.jsx";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import HousingReportsToolbar from "./HousingReportsToolbar";
import HousingKPI from "./Charts/HousingKPI.jsx";
import HousingOccupancyBar from "./Charts/HousingOccupancyBar.jsx";
import HousingOperationalReservesBar from "./Charts/HousingOperationalReservesBar.jsx";
import { HousingVacancyKPI } from "./Charts/HousingVacancyKPI.jsx";
import "./Charts/HousingDashboard.css";

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

  // Active report state: "table" or "summary"
  const [activeReport, setActiveReport] = useState("table");

  // Fetch data on mount
  useEffect(() => {
    fetchMonthlyHousing();
    fetchSummaryHousing();
  }, [fetchMonthlyHousing, fetchSummaryHousing]);

  // Clear filters and reset report
  const handleClear = () => {
    setYear("");
    setBuilding("");
    setSearch("");
    setActiveReport("table"); // default to table
  };

  // Filter records for Monthly Table
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

  // ---------------- KPI Calculations ----------------
  const lastMonthData = reportData[0]; // most recent month

  // Get most recent month
  const latestMonth = [...reportData].sort(
    (a, b) => new Date(b.month_start) - new Date(a.month_start)
  )[0]?.month_start;

  // Map buildings to current + upcoming vacancies
  const vacancyByBuilding = reportData
    .filter((r) => r.month_start === latestMonth)
    .map((r) => ({
      building: r.building_name,
      current: r.current_vacancies ?? 0,
      upcoming: r.upcoming_vacancies ?? 0,
    }));

  const reservesByBuilding = lastMonthData
    ? [...reportData]
        .filter(
          (r) =>
            new Date(r.month_start).getMonth() ===
            new Date(lastMonthData.month_start).getMonth()
        )
        .map((r) => ({
          building: r.building_name,
          operational: r.operational_reserves ?? 0,
          replacement: r.replacement_reserves ?? 0,
        }))
    : [];

  return (
    <div className="hub-container">
      {/* Page Header */}
      <DepartmentHeader
        title="North Campus Housing Reports"
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

      {/* ---------------- Dashboard ---------------- */}
      <div className="dashboard-container housing">
        {/* Charts Row */}
        <div className="charts-row housing">
          <div className="chart-column housing">
            <HousingOccupancyBar records={reportData} />
          </div>
          <div className="chart-column housing">
            <HousingOperationalReservesBar records={reportData} />
          </div>
        </div>

        {/* KPI Row */}
        <div className="kpi-row housing horizontal">
          {/* Reserves per building */}
          {reservesByBuilding.map((b) => (
            <div key={b.building} className="kpi-card housing">
              <div className="kpi-title housing">{b.building}</div>
              <div className="kpi-value housing" style={{ color: "#03a696" }}>
                Op: {currencyFormatter.format(b.operational)} <br />
                Repl: {currencyFormatter.format(b.replacement)}
              </div>
            </div>
          ))}

          {/* Vacancy KPIs */}
          {vacancyByBuilding.map((v) => (
            <HousingVacancyKPI
              key={v.building}
              building={v.building}
              current={v.current}
              upcoming={v.upcoming}
            />
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <HousingReportsToolbar
        reportData={reportData}
        year={year}
        setYear={setYear}
        building={building}
        setBuilding={setBuilding}
        search={search}
        setSearch={setSearch}
        onClear={handleClear}
      />

      {/* Monthly Table */}
      <div style={{ marginTop: "1rem" }}>
        {loadingHousingReports ? (
          <p>Loading report…</p>
        ) : filteredRecords.length === 0 ? (
          <p>No records match the current filters.</p>
        ) : (
          <HousingMonthlyTable records={filteredRecords} />
        )}
      </div>
    </div>
  );
}
