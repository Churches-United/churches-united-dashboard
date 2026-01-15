import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";

import DonationWeeklyReport from "./Reports/DonationWeeklyReport";
import DonationMonthlyReport from "./Reports/DonationMonthlyReport";
import DonationByDonorReport from "./Reports/DonationByDonorReport";
import UpcomingEventsReport from "./Reports/UpcomingEventsReport";
import EventsByVenueReport from "./Reports/EventsByVenueReport";

import DevelopmentReportsToolbar from "./DevelopmentReportsToolbar";
import useStore from "../../zustand/store";

export default function DevelopmentReportsPage() {
  // ------------------------------
  // State
  // ------------------------------
  const [category, setCategory] = useState("donations"); // Donations or Events
  const [report, setReport] = useState("weekly"); // default report per category

  const [filters, setFilters] = useState({
    year: "",
    name: "",
    search: "",
  });

  // ------------------------------
  // Store data
  // ------------------------------
  const donations = useStore((s) => s.donations);
  const donors = useStore((s) => s.donors);
  const events = useStore((s) => s.events);
  const fetchDonations = useStore((s) => s.fetchDonations);
  const fetchDonors = useStore((s) => s.fetchDonors);
  const fetchEvents = useStore((s) => s.fetchEvents);
  const loading = useStore((s) => s.loading);
  const error = useStore((s) => s.error);

  useEffect(() => {
    fetchDonations();
    fetchDonors();
    fetchEvents();
  }, [fetchDonations, fetchDonors, fetchEvents]);

  // ------------------------------
  // Report defaults when category changes
  // ------------------------------
  useEffect(() => {
    if (category === "donations") setReport("weekly");
    if (category === "events") setReport("upcoming");
    // reset filters when category changes (optional)
    setFilters({ year: "", name: "", search: "" });
  }, [category]);

  // ------------------------------
  // Derived dropdown options
  // ------------------------------
  const yearOptions = Array.from(
    new Set(
      (category === "donations" ? donations : events)
        .map((item) =>
          item.datetime ? new Date(item.datetime).getFullYear() : item.year
        )
        .filter(Boolean)
    )
  ).sort((a, b) => b - a); // descending

  const nameOptions = Array.from(
    new Set(
      (category === "donations"
        ? donors.map((d) => d.name)
        : events.map((e) => e.name)
      ).filter(Boolean)
    )
  ).sort();

  // ------------------------------
  // Report options per category
  // ------------------------------
  const reportOptions =
    category === "donations"
      ? [
          { value: "weekly", label: "Donations Weekly" },
          { value: "monthly", label: "Donations Monthly" },
          { value: "by-donor", label: "Donors" },
        ]
      : [
          { value: "upcoming", label: "Upcoming Events" },
          { value: "by-venue", label: "Events by Venue" },
        ];

  // ------------------------------
  // Render active report
  // ------------------------------
  const renderReport = () => {
    if (category === "donations") {
      if (report === "weekly")
        return <DonationWeeklyReport filters={filters} />;
      if (report === "monthly")
        return <DonationMonthlyReport filters={filters} />;
      if (report === "by-donor")
        return <DonationByDonorReport filters={filters} />;
    }

    if (category === "events") {
      if (report === "upcoming")
        return <UpcomingEventsReport filters={filters} />;
      if (report === "by-venue")
        return <EventsByVenueReport filters={filters} />;
    }

    return null;
  };

  // ------------------------------
  // Loading / error states
  // ------------------------------
  if (loading) return <p>Loading reports...</p>;
  if (error) return <p>Error: {error}</p>;

  // ------------------------------
  // Render Page
  // ------------------------------
  return (
    <div className="hub-container development-reports">
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

      {/* Toolbar + Filters */}
      <div className="toolbar-wrapper development-reports">
        <DevelopmentReportsToolbar
          category={category}
          setCategory={setCategory}
          report={report}
          setReport={setReport}
          reportOptions={reportOptions}
          filters={filters}
          setFilters={setFilters}
          yearOptions={yearOptions}
          nameOptions={nameOptions}
          onClear={() => setFilters({ year: "", name: "", search: "" })}
        />
      </div>

      {/* Active Report Table */}
      <div className="tab-content">{renderReport()}</div>
    </div>
  );
}
