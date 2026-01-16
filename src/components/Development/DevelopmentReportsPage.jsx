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
import MonthlyDonationChart from "./Charts/MonthlyDonationChart";

export default function DevelopmentReportsPage() {
  // ---------------- State ----------------
  const [category, setCategory] = useState("donations");
  const [report, setReport] = useState("weekly");
  const [filters, setFilters] = useState({
    year: "",
    name: "",
    search: "",
  });

  // ---------------- Store Data ----------------
  const donations = useStore((state) => state.donations) || [];
  const donationWeeklyReports =
    useStore((state) => state.donationWeeklyReports) || [];
  const donationMonthlyReports =
    useStore((state) => state.donationMonthlyReports) || [];

  const fetchDonations = useStore((state) => state.fetchDonations);
  const fetchWeeklyDonationReports = useStore(
    (state) => state.fetchWeeklyDonationReports
  );
  const fetchMonthlyDonationReports = useStore(
    (state) => state.fetchMonthlyDonationReports
  );

  // ---------------- Fetch Data ----------------
  useEffect(() => {
    fetchDonations();
    fetchWeeklyDonationReports();
    fetchMonthlyDonationReports();
  }, [fetchDonations, fetchWeeklyDonationReports, fetchMonthlyDonationReports]);

  // ---------------- KPIs ----------------
  // Determine latest donation month
  const latestDonationDate = donations
    .map((d) => new Date(d.date))
    .sort((a, b) => b - a)[0]; // newest first

  const latestYear = latestDonationDate?.getFullYear();
  const latestMonth = latestDonationDate?.getMonth();

  const donationsThisMonth = donations.filter((d) => {
    const date = new Date(d.date);
    return date.getFullYear() === latestYear && date.getMonth() === latestMonth;
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

  // ---------------- Dropdown Options ----------------
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
  }

  // ---------------- Report Options ----------------
  const reportOptions = [
    { value: "weekly", label: "Donations Weekly" },
    { value: "monthly", label: "Donations Monthly" },
    { value: "by-donor", label: "Donors" },
  ];

  const handleClearFilters = () =>
    setFilters({ year: "", name: "", search: "" });

  // ---------------- Render Report Component ----------------
  const renderReport = () => {
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
  };

  // ---------------- Render ----------------
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

      {/* ---------------- KPIs + Chart ---------------- */}
      <div className="dashboard-container outreach">
        <div className="chart-column">
          <MonthlyDonationChart reports={donationMonthlyReports} />
        </div>
        <div className="kpi-column">
          <DevelopmentKPI
            title="Total Donations (Month)"
            value={`$${totalDonationsMonth.toLocaleString()}`}
          />
          <DevelopmentKPI
            title="# Donations (Month)"
            value={donationCountMonth}
          />
          <DevelopmentKPI title="Top Donor (Month)" value={topDonor} />
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
          nameOptions={[]}
          onClear={handleClearFilters}
        />
      </div>

      {/* ---------------- Report Table ---------------- */}
      <div className="report-container">{renderReport()}</div>
    </div>
  );
}
