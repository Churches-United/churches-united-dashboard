import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import DevelopmentReportsToolbar from "./DevelopmentReportsToolbar";
import DonationReporting from "./Reports/DonationReporting";
import useStore from "../../zustand/store";

export default function DevelopmentReportsPage() {
  // --- Tabs as dropdown ---
  const [activeReport, setActiveReport] = useState("donations");

  // --- Filters for each report ---
  const [donationFilters, setDonationFilters] = useState({});
  const [donorFilters, setDonorFilters] = useState({});

  const handleClearDonationFilters = () => setDonationFilters({});
  const handleClearDonorFilters = () => setDonorFilters({});

  // --- Fetch data from store (optional if you want live counts for cards) ---
  const donors = useStore((s) => s.donors);
  const donations = useStore((s) => s.donations);
  const events = useStore((s) => s.events);
  const fetchDonors = useStore((s) => s.fetchDonors);
  const fetchDonations = useStore((s) => s.fetchDonations);
  const fetchEvents = useStore((s) => s.fetchEvents);

  useEffect(() => {
    fetchDonors();
    fetchDonations();
    fetchEvents();
  }, [fetchDonors, fetchDonations, fetchEvents]);

  // --- Top metrics cards ---
  const cards = [
    { label: "Total Donations", value: donations.length },
    { label: "Total Donors", value: donors.length },
    {
      label: "Upcoming Events (3 months)",
      value: events
        .filter((e) => {
          const now = new Date();
          const threeMonths = new Date();
          threeMonths.setMonth(now.getMonth() + 3);
          const eventDate = new Date(e.datetime);
          return eventDate >= now && eventDate <= threeMonths;
        })
        .length,
    },
  ];

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

      {/* Top Cards */}
      <div className="report-cards">
        {cards.map((c) => (
          <div key={c.label} className="report-card">
            <p className="report-card-value">{c.value}</p>
            <p className="report-card-label">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Toolbar + Report Selector */}
      <div className="toolbar-wrapper development-reports">
        <DevelopmentReportsToolbar
          activeTable={activeReport === "donations" ? "donations" : "donors"}
          tableData={{
            donations,
            donors,
          }}
          filters={activeReport === "donations" ? donationFilters : donorFilters}
          setFilters={
            activeReport === "donations" ? setDonationFilters : setDonorFilters
          }
          onClear={
            activeReport === "donations"
              ? handleClearDonationFilters
              : handleClearDonorFilters
          }
          reportOptions={["Donations", "Donors"]}
          activeReport={activeReport}
          setActiveReport={setActiveReport}
        />
      </div>

      {/* Table / Report */}
      <div className="report-table">
        {activeReport === "donations" && (
          <DonationReporting filters={donationFilters} />
        )}
        {activeReport === "donors" && (
          <DonorReporting filters={donorFilters} />
        )}
      </div>
    </div>
  );
}


// todo - decide if events is worth having a filter for?
// todo - instead could do an event card with the next 3 months listed
// todo - come up with some donation cards 

