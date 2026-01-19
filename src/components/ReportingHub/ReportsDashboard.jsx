import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "./ReportsDashboard.css";

import CommunityOutreachReportsPage from "../CommunityOutreach/Reports/CommunityOutreachReportsPage";
import DevelopmentReportsPage from "../Development/DevelopmentReportsPage";
import HousingReports from "../Housing/HousingReports";
import MediaReports from "../Media/Reports/MediaReports";
import ComplianceReporting from "../ComplianceWeekly/ComplianceReporting";
import ShelterReporting from "../Shelter/ShelterReporting";
import FinanceReporting from "../Finance/FinanceReporting";

import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import PantryReports from "../pantry/PantryReports";
import KitchenReports from "../kitchen/KitchenReports";
import HRReports from "../hr/HRReports";
import MonthlyDonationPie from "../Development/Charts/MonthlyDonationPie";

export default function ReportsHub() {
  // Dynamic array of report sections
  const reportSections = [
    {
      id: "housing",
      title: "North Campus Housing Reports",
      Component: HousingReports,
    },
    {
      id: "media",
      title: "Media Reporting",
      Component: MediaReports,
    },
    {
      id: "volunteer",
      title: "Community Outreach Reports",
      Component: CommunityOutreachReportsPage,
    },
    {
      id: "development",
      title: "Development Reports",
      Component: DevelopmentReportsPage,
    },
    {
      id: "compliance",
      title: "Compliance Reports",
      Component: ComplianceReporting,
    },
    {
      id: "shelter",
      title: "Shelter Reports",
      Component: ShelterReporting,
    },
    {
      id: "finance",
      title: "Finance Reports",
      Component: FinanceReporting,
    },
        {
      id: "pantry",
      title: "Pantry Reports",
      Component: PantryReports,
    },
        {
      id: "kitchen",
      title: "Kitchen Reports",
      Component: KitchenReports,
    },
        {
      id: "hr",
      title: "Human Resources Reports",
      Component: HRReports,
    },
  ];

  return (
    <div className="hub-container report-hub">
      <DepartmentHeader title="Department Reporting Dashboard" />
      <p>Select a section to view reports.</p>

      <Accordion defaultActiveKey="0" alwaysOpen={false}>
        {reportSections.map(({ id, title, Component }, index) => (
          <Accordion.Item eventKey={index.toString()} key={id}>
            <Accordion.Header>{title}</Accordion.Header>
            <Accordion.Body>
              <Component />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

