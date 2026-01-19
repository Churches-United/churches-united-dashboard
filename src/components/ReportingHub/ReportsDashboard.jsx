import { Link } from "react-router-dom";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import ReportsSummary from "./ReportsSummary";
import "../../styles/departmentCards.css";
import useStore from "../../zustand/store";
import { useEffect } from "react";
import { useState } from "react";
import "./Summary/ReportsSummary.css";
import "./ReportsDashboard.css";

export default function ReportsDashboard() {
  const summaryData = {
    outreach: useStore((s) => s.outreachMonthlyReports),
    development: useStore((s) => s.developmentMonthlyReports),
  };

  const volunteerMonthlyReports = useStore(
    (state) => state.volunteerMonthlyReports
  );
  const fetchVolunteerMonthlyReports = useStore(
    (state) => state.fetchVolunteerMonthlyReports
  );

  useEffect(() => {
    fetchVolunteerMonthlyReports();
  }, [fetchVolunteerMonthlyReports]);

  const reportSections = [
    {
      path: "/outreach/reports",
      title: "Community Outreach",
      description: "Volunteer engagement, signups, and locations.",
    },
    {
      path: "/development/reports",
      title: "Development",
      description: "Donations, donors, and fundraising trends.",
    },
    {
      path: "/finance/reports",
      title: "Finance",
      description: "Financial metrics and reporting.",
    },
    {
      path: "/housing/reports",
      title: "Housing",
      description: "Occupancy, vacancies, and housing metrics.",
    },
    {
      path: "/media/reports",
      title: "Media",
      description: "Website, social, and newsletter metrics.",
    },
    {
      path: "/pantry/reports",
      title: "Pantry",
      description: "Pantry usage and distribution reports.",
    },
    {
      path: "/kitchen/reports",
      title: "Kitchen",
      description: "Meal service and kitchen reporting.",
    },
    {
      path: "/hr/reports",
      title: "Human Resources",
      description: "HR weekly updates.",
    },
    {
      path: "/compliance/reports",
      title: "Compliance",
      description: "Weekly compliance tracking.",
    },
    {
      path: "/shelter/reports",
      title: "Shelter",
      description: "Shelter operations and guest reporting.",
    },
  ];

  return (
    <div className="hub-container report-hub">
      <div className="report-summary">
        <DepartmentHeader title="Department Reporting Dashboard" />

        <ReportsSummary />
      </div>
      <h3>Department Reports</h3>
      <p className="mb-4">Select a department to view reports.</p>
      <div className="department-cards-report-container">
        {reportSections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className="card-link-wrapper"
          >
            <div className="department-card report">
              <h4>{section.title}</h4>
              <p>{section.description}</p>
              <span className="btn btn-primary">View Reports</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
