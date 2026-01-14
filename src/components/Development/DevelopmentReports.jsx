import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import DonationReporting from "./Reports/DonationReporting";
import EventsReporting from "./Reports/EventsReporting";

export default function DevelopmentReports() {
  const [activeTab, setActiveTab] = useState("donations");

  return (
    <div className="hub-container">
      {/* Department Header */}
      <DepartmentHeader
        title="Development"
        actions={
          <>
            <NavLink
              to="/development"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/development/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Reports
            </NavLink>
          </>
        }
      />

      <div className="tabs">
        <button
          className={activeTab === "donations" ? "active" : ""}
          onClick={() => setActiveTab("donations")}
        >
          Donations
        </button>
        <button
          className={activeTab === "events" ? "active" : ""}
          onClick={() => setActiveTab("events")}
        >
          Events
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "donations" && <DonationReporting />}
        {activeTab === "events" && <EventsReporting />}
      </div>
    </div>
  );
}