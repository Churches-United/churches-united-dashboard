import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../zustand/store";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";

// Reports and toolbar
import DevelopmentReportsToolbar from "./DevelopmentReportsToolbar";
import DonationWeeklyReport from "./Reports/DonationWeeklyReport";
import DonationMonthlyReport from "./Reports/DonationMonthlyReport";
import DonationByDonorReport from "./Reports/DonationByDonorReport";
import UpcomingEventsReport from "./Reports/UpcomingEventsReport";
import EventsByVenueReport from "./Reports/EventsByVenueReport";

export default function DevelopmentReportsPage() {
  // ---------------- State ----------------
  const [category, setCategory] = useState("donations");
  const [report, setReport] = useState("weekly"); // default report
  const [filters, setFilters] = useState({
    year: "",
    name: "",
    search: "",
  });

  // ---------------- Store Data ----------------
  const donationWeeklyReports =
    useStore((state) => state.donationWeeklyReports) || [];
  const donationMonthlyReports =
    useStore((state) => state.donationMonthlyReports) || [];
  const donations = useStore((state) => state.donations) || [];
  const donors = useStore((state) => state.donors) || [];
  const events = useStore((state) => state.events) || [];

  const fetchDonations = useStore((state) => state.fetchDonations);
  const fetchDonors = useStore((state) => state.fetchDonors);
  const fetchEvents = useStore((state) => state.fetchEvents);
  const fetchWeeklyDonationReports = useStore(
    (state) => state.fetchWeeklyDonationReports
  );
  const fetchMonthlyDonationReports = useStore(
    (state) => state.fetchMonthlyDonationReports
  );

  // Fetch data on mount
  useEffect(() => {
    fetchDonations();
    fetchDonors();
    fetchEvents();
    fetchWeeklyDonationReports();
    fetchMonthlyDonationReports();
  }, [
    fetchDonations,
    fetchDonors,
    fetchEvents,
    fetchWeeklyDonationReports,
    fetchMonthlyDonationReports,
  ]);

  // ---------------- derive dropdown options ----------------
  // Year options
  let yearOptions = [];
  if (report === "weekly") {
    yearOptions = donationWeeklyReports
      .map((r) => new Date(r.week_start).getFullYear())
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => b - a);
  } else if (report === "monthly") {
    yearOptions = donationMonthlyReports
      .map((r) => new Date(r.month_start).getFullYear())
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => b - a);
  } else if (report === "by-donor") {
    yearOptions = []; // skip year for donors
  } else if (report === "upcoming" || report === "by-venue") {
    yearOptions = events
      .map((e) => new Date(e.datetime).getFullYear())
      .filter((v, i, a) => a.indexOf(v) === i)
      .sort((a, b) => b - a);
  }

  // Name / Event options
  const nameOptions =
    category === "donations" && donors.length
      ? Array.from(new Set(donors.map((d) => d.name))).sort()
      : category === "events" && events.length
      ? Array.from(new Set(events.map((e) => e.name))).sort()
      : [];

  // ---------------- Report Options ----------------
  const reportOptions =
    category === "donations"
      ? [
          { value: "weekly", label: "Donations Weekly" },
          { value: "monthly", label: "Donations Monthly" },
          { value: "by-donor", label: "Donors" },
        ]
      : [
          { value: "upcoming", label: "Upcoming Events" },
          { value: "by-venue", label: "Events By Venue" },
        ];

  const handleClearFilters = () =>
    setFilters({ year: "", name: "", search: "" });

  // ---------------- Render Report Component ----------------
  const renderReport = () => {
    if (category === "donations") {
      switch (report) {
        case "weekly":
          return <DonationWeeklyReport filters={filters} />;
        case "monthly":
          return <DonationMonthlyReport filters={filters} />;
        case "by-donor":
          return <DonationByDonorReport filters={filters} />;
        default:
          return <DonationWeeklyReport filters={filters} />;
      }
    } else if (category === "events") {
      switch (report) {
        case "upcoming":
          return <UpcomingEventsReport filters={filters} />;
        case "by-venue":
          return <EventsByVenueReport filters={filters} />;
        default:
          return <UpcomingEventsReport filters={filters} />;
      }
    }
  };

  return (
    <div className="hub-container development-reports">
      {/* ---------------- Department Header ---------------- */}
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

      {/* ---------------- Toolbar ---------------- */}
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
          onClear={handleClearFilters}
        />
      </div>

      {/* ---------------- Report Table / Cards ---------------- */}
      <div className="report-container">{renderReport()}</div>
    </div>
  );
}
