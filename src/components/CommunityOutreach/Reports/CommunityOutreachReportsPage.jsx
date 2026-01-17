import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../../zustand/store";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";
import OutreachReportsToolbar from "./OutreachReportsToolBar";
import VolunteerWeeklyReport from "./VolunteerWeeklyReport";
import VolunteerMonthlyReport from "./VolunteerMonthlyReport";
import VolunteerByLocationReport from "./VolunteerByLocationReport";
import VolunteerMonthlyByLocationReport from "./VolunteerMonthlyByLocationReport";
import MonthlyVolunteerYoYChart from "../Charts/MonthlyVolunteerYoYChart";
import VolunteerKPI from "./VolunteerKPI";
import "./OutreachReports.css";

export default function CommunityOutreachReportsPage() {
  // ---------------- State ----------------
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [activeReport, setActiveReport] = useState("weekly");

  // ---------------- Store Data ----------------
  const weeklyReports = useStore((state) => state.volunteerWeeklyReports) || [];
  const monthlyReports =
    useStore((state) => state.volunteerMonthlyReports) || [];
  const byLocationReports =
    useStore((state) => state.volunteerByLocationReports) || [];
  const monthlyByLocationReports =
    useStore((state) => state.volunteerMonthlyByLocationReports) || [];
  const volunteerEngagements = useStore((state) => state.engagements) || [];

  const fetchEngagements = useStore((state) => state.fetchEngagements);
  const fetchVolunteerMonthlyReports = useStore(
    (state) => state.fetchVolunteerMonthlyReports
  );

  // ---------------- Fetch Data ----------------
  useEffect(() => {
    fetchEngagements();
    fetchVolunteerMonthlyReports();
  }, [fetchEngagements, fetchVolunteerMonthlyReports]);

  // ---------------- Current Month & YTD ----------------
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const periodData = volunteerEngagements.filter((r) => {
    if (!r.event_date) return false;
    const d = new Date(r.event_date);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });

  const ytdData = volunteerEngagements.filter((r) => {
    if (!r.event_date) return false;
    return new Date(r.event_date).getFullYear() === currentYear;
  });

  const periodVolunteers = periodData.reduce(
    (sum, r) => sum + (r.number_volunteers ?? 0),
    0
  );
  const ytdVolunteers = ytdData.reduce(
    (sum, r) => sum + (r.number_volunteers ?? 0),
    0
  );

  const periodSignups = periodData.reduce(
    (sum, r) => sum + (r.software_signups ?? 0),
    0
  );
  const ytdSignups = ytdData.reduce(
    (sum, r) => sum + (r.software_signups ?? 0),
    0
  );

  // Month name for KPI titles
  const monthName = now.toLocaleString("default", { month: "long" });

  // ---------------- Toolbar Options ----------------
  const allReports = [
    ...weeklyReports,
    ...monthlyReports,
    ...byLocationReports,
    ...monthlyByLocationReports,
  ];

  const YEAR_OPTIONS = Array.from(
    new Set(
      allReports
        .map((r) => {
          const date = r.week_start || r.month_start || r.event_date;
          return date ? new Date(date).getFullYear() : null;
        })
        .filter(Boolean)
    )
  ).sort((a, b) => b - a);

  const LOCATION_OPTIONS = Array.from(
    new Set(allReports.map((r) => r.location).filter(Boolean))
  ).sort();

  const handleClearFilters = () => {
    setYear("");
    setLocation("");
    setSearch("");
    setActiveReport("weekly");
  };

  // ---------------- Render Report ----------------
  const renderReport = () => {
    const reportProps = { year, location, search };
    switch (activeReport) {
      case "weekly":
        return <VolunteerWeeklyReport {...reportProps} />;
      case "monthly":
        return <VolunteerMonthlyReport {...reportProps} />;
      case "by-location":
        return <VolunteerByLocationReport {...reportProps} />;
      case "monthly-by-location":
        return <VolunteerMonthlyByLocationReport {...reportProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="hub-container outreach">
      {/* ---------------- Department Header ---------------- */}
      <DepartmentHeader
        title="Community Outreach Reports"
        actions={
          <>
            <NavLink to="/outreach" end>
              Data Entry
            </NavLink>
            <NavLink to="/outreach/reports">Reports</NavLink>
          </>
        }
      />

      {/* ---------------- Chart + KPIs ---------------- */}
      <div className="dashboard-container outreach">
        <div className="chart-column outreach">
          <h3 className="chart-title">Monthly Volunteers — Last 6 Months</h3>
          <MonthlyVolunteerYoYChart reports={monthlyReports} monthsToShow={6} />
        </div>

        <div className="kpi-column outreach">
          <VolunteerKPI
            title={`Total ${monthName} Volunteers`}
            monthlyReports={monthlyReports}
            valueField="total_volunteers"
            color="blue"
          />
          <VolunteerKPI
            title={`${monthName} Software Signups`}
            monthlyReports={monthlyReports}
            valueField="total_signups"
            color="green"
          />
        </div>
      </div>

      {/* ---------------- Toolbar ---------------- */}
      <OutreachReportsToolbar
        year={year}
        setYear={setYear}
        location={location}
        setLocation={setLocation}
        search={search}
        setSearch={setSearch}
        activeReport={activeReport}
        setActiveReport={setActiveReport}
        YEAR_OPTIONS={YEAR_OPTIONS}
        LOCATION_OPTIONS={LOCATION_OPTIONS}
        onClear={handleClearFilters}
      />

      {/* ---------------- Report Table ---------------- */}
      <div className="report-container">{renderReport()}</div>
    </div>
  );
}
