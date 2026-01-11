import React, { useState } from "react";
import VolunteerWeeklyReport from "./VolunteerWeeklyReport";
import VolunteerMonthlyReport from "./VolunteerMonthlyReport";
import VolunteerByLocationReport from "./VolunteerByLocationReport";
import VolunteerMonthlyByLocationReport from "./VolunteerMonthlyByLocationReport";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";

export default function VolunteerReportsPage() {
  const [activeTab, setActiveTab] = useState("weekly");

  const renderReport = () => {
    switch (activeTab) {
      case "weekly":
        return <VolunteerWeeklyReport />;
      case "monthly":
        return <VolunteerMonthlyReport />;
      case "by-location":
        return <VolunteerByLocationReport />;
      case "monthly-by-location":
        return <VolunteerMonthlyByLocationReport />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="hub-container">
        <DepartmentHeader
          title="Community Outreach"
          actions={
            <>
              <a href="#/outreach" className="header-action">
                Data Entry
              </a>
              <a href="#/outreach/reports" className="header-action">
                Reports
              </a>
            </>
          }
        />
        <div className="tabs">
          <button onClick={() => setActiveTab("weekly")}>Weekly</button>
          <button onClick={() => setActiveTab("monthly")}>Monthly</button>
          <button onClick={() => setActiveTab("by-location")}>
            By Location
          </button>
          <button onClick={() => setActiveTab("monthly-by-location")}>
            Monthly by Location
          </button>
        </div>

        <div className="report-container">{renderReport()}</div>
      </div>
    </div>
  );
}
