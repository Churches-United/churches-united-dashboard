import { useState } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../../zustand/store";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";
import ReportsToolbar from "./ReportsToolBar";

import VolunteerWeeklyReport from "./VolunteerWeeklyReport";
import VolunteerMonthlyReport from "./VolunteerMonthlyReport";
import VolunteerByLocationReport from "./VolunteerByLocationReport";
import VolunteerMonthlyByLocationReport from "./VolunteerMonthlyByLocationReport";

export default function CommunityOutreachReportsPage() {
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [activeReport, setActiveReport] = useState("weekly");

  const weeklyReports = useStore((state) => state.volunteerWeeklyReports);
  const monthlyReports = useStore((state) => state.volunteerMonthlyReports);
  const byLocationReports = useStore(
    (state) => state.volunteerByLocationReports
  );
  const monthlyByLocationReports = useStore(
    (state) => state.volunteerMonthlyByLocationReports
  );

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

  const handleClearFilters = () => {
    setYear("");
    setLocation("");
    setSearch("");
    setActiveReport("weekly"); 
  };

  return (
    <div className="hub-container">
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

      <ReportsToolbar
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

      <div className="report-container">{renderReport()}</div>
    </div>
  );
}
