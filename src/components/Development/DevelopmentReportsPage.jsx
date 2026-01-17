import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../zustand/store";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import DevelopmentKPI from "./Charts/DevelopmentKPI";
import "./Charts/DevelopmentCharts.css";

// Reports and toolbar
import DevelopmentReportsToolbar from "./DevelopmentReportsToolbar";
import DonationWeeklyReport from "./Reports/DonationWeeklyReport";
import DonationMonthlyReport from "./Reports/DonationMonthlyReport";
import DonationByDonorReport from "./Reports/DonationByDonorReport";
import UpcomingEventsReport from "./Reports/UpcomingEventsReport";
import EventsByVenueReport from "./Reports/EventsByVenueReport";
import MonthlyDonationKPI from "./Charts/MonthlyDonationKPI";
import MonthlyDonationChart from "./Charts/MonthlyDonationChart";
import MonthlyDonationPie from "./Charts/MonthlyDonationPie";

export default function DevelopmentReportsPage() {
  // ---------------- State ----------------
  const [category, setCategory] = useState("donations");
  const [report, setReport] = useState("monthly");
  const [filters, setFilters] = useState({ year: "", name: "", search: "" });
  const [pieData, setPieData] = useState({ restricted: 0, unrestricted: 0 });

  // ---------------- Store Data ----------------
  const donations = useStore((state) => state.donations) || [];
  const donationMonthlyReports =
    useStore((state) => state.donationMonthlyReports) || [];
  const fetchDonations = useStore((state) => state.fetchDonations);
  const fetchMonthlyDonationReports = useStore(
    (state) => state.fetchMonthlyDonationReports
  );
  const events = useStore((state) => state.events) || [];
  const fetchEvents = useStore((state) => state.fetchEvents);

  // ---------------- Fetch data ----------------
  useEffect(() => {
    fetchDonations();
    fetchMonthlyDonationReports();
    fetchEvents();
  }, [fetchDonations, fetchMonthlyDonationReports, fetchEvents]);

  // ---------------- Compute KPIs ----------------
  // todo should we combine total$ and total donations to one card to make more room?
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Donations in current month
  const donationsThisMonth = donations.filter((d) => {
    const date = new Date(d.date);
    return (
      date.getFullYear() === currentYear && date.getMonth() === currentMonth
    );
  });

  const totalDonationsMonth = donationsThisMonth.reduce(
    (sum, d) => sum + Number(d.amount || 0),
    0
  );

  const donationCountMonth = donationsThisMonth.length;

  const donorTotals = donationsThisMonth.reduce((acc, d) => {
    acc[d.donor_name] = (acc[d.donor_name] || 0) + Number(d.amount || 0);
    return acc;
  }, {});

  const topDonorEntry = Object.entries(donorTotals).sort(
    (a, b) => b[1] - a[1]
  )[0];
  const topDonor = topDonorEntry
    ? `${topDonorEntry[0]} ($${topDonorEntry[1].toLocaleString()})`
    : "N/A";

  const monthName = now.toLocaleString("default", { month: "long" });

  // ---------------- Next 2 Events ----------------
  const upcomingEvents = events
    .map((e) => ({ ...e, dateObj: new Date(e.datetime) }))
    .filter((e) => e.dateObj >= new Date()) // only future events
    .sort((a, b) => a.dateObj - b.dateObj);

  const nextTwoEvents = upcomingEvents.slice(0, 3); // get first 2 events

  // Format as string for display in one card
  const nextEventsDisplay =
    nextTwoEvents.length > 0
      ? nextTwoEvents
          .map((e) => `${e.name} (${e.dateObj.toLocaleDateString()})`)
          .join(", ")
      : "N/A";

  // ---------------- Pie Chart Data (last 6 months) ----------------
  useEffect(() => {
    if (!donationMonthlyReports.length) return;

    const last6 = [...donationMonthlyReports]
      .sort((a, b) => new Date(a.month_start) - new Date(b.month_start))
      .slice(-6);

    let restricted = 0;
    let unrestricted = 0;

    last6.forEach((r) => {
      const total = Number(r.total_amount || 0);
      const restrictedAmount = Number(r.restricted_amount || 0);
      restricted += restrictedAmount;
      unrestricted += total - restrictedAmount;
    });

    setPieData({ restricted, unrestricted });
  }, [donationMonthlyReports]);

  // ---------------- Report Component ----------------
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

  // ---------------- Dropdown Options ----------------
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

  const yearOptions = donationMonthlyReports
    .map((r) => new Date(r.month_start).getFullYear())
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => b - a);

  const nameOptions = Array.from(
    new Set(donations.map((d) => d.donor_name))
  ).sort();

  const handleClearFilters = () =>
    setFilters({ year: "", name: "", search: "" });

  return (
    <div className="hub-container development-reports">
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

      {/* ---------------- Charts ---------------- */}
      <div className="dashboard-container development">
        <div className="charts-row development">
          <div className="chart-column development">
            <MonthlyDonationChart reports={donationMonthlyReports} />
          </div>
          <div className="pie-column development">
            <MonthlyDonationPie
              restricted={pieData.restricted}
              unrestricted={pieData.unrestricted}
            />
          </div>
        </div>

        {/* ---------------- KPIs ---------------- */}
        {/* todo - format date */}
        <div className="kpi-row development horizontal">
          <MonthlyDonationKPI
            month={monthName}
            total={totalDonationsMonth}
            count={donationCountMonth}
            topDonor={topDonor}
          />

          {/* Upcoming Events Card */}
          <DevelopmentKPI
            title="Next Events"
            value={
              nextTwoEvents.length > 0
                ? nextTwoEvents.map((e, i) => (
                    <div key={i}>{`${
                      e.name
                    } (${e.dateObj.toLocaleDateString()})`}</div>
                  ))
                : "N/A"
            }
          />
        </div>
      </div>

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

      {/* ---------------- Report Table ---------------- */}
      <div className="report-container">{renderReport()}</div>
    </div>
  );
}
