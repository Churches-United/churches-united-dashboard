import React, { useState } from "react";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";
import ReportsToolbar from "./ReportsToolbar";

import VolunteerWeeklyReport from "./VolunteerWeeklyReport";
import VolunteerMonthlyReport from "./VolunteerMonthlyReport";
import VolunteerByLocationReport from "./VolunteerByLocationReport";
import VolunteerMonthlyByLocationReport from "./VolunteerMonthlyByLocationReport";

import { NavLink } from "react-router-dom";
import "./OutreachReports.css";

export default function CommunityOutreachReportsPage() {
  // Filter states
  const [year, setYear] = useState("");
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");

  const [activeReport, setActiveReport] = useState("weekly");
  // Active report tab

  const renderReport = () => {
    switch (activeReport) {
      case "weekly":
        return (
          <VolunteerWeeklyReport
            year={year}
            location={location}
            search={search}
          />
        );
      case "monthly":
        return (
          <VolunteerMonthlyReport
            year={year}
            location={location}
            search={search}
          />
        );
      case "by-location":
        return (
          <VolunteerByLocationReport
            year={year}
            location={location}
            search={search}
          />
        );
      case "monthly-by-location":
        return (
          <VolunteerMonthlyByLocationReport
            year={year}
            location={location}
            search={search}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="hub-container">
      {/* Department Header */}
      <DepartmentHeader
        title="Community Outreach"
        actions={
          <>
            <NavLink
              to="/outreach"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Data Entry
            </NavLink>
            <NavLink
              to="/outreach/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Reports
            </NavLink>
          </>
        }
      />

      {/* Toolbar */}
      <ReportsToolbar
        year={year}
        setYear={setYear}
        location={location}
        setLocation={setLocation}
        search={search}
        setSearch={setSearch}
        activeReport={activeReport}
        setActiveReport={setActiveReport}
      />

      {/* Active Report */}
      <div className="report-container">{renderReport()}</div>
    </div>
  );
}
