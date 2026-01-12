import React from "react";
import Accordion from "react-bootstrap/Accordion";

// Original Components
import VolunteerReportsPage from "../CommunityOutreach/Reports/VolunteerReportsPage";
import DevelopmentReports from "../Development/DevelopmentReports";
import HousingReports from "../Housing/HousingReports";
import MediaReports from "../Media/Reports/MediaReports";

// Your New Components
import ComplianceReporting from "../ComplianceWeekly/ComplianceReporting";
import ShelterReporting from "../Shelter/ShelterReporting";
import FinanceReporting from "../Finance/FinanceReporting";

import DepartmentHeader from "../DesignComponents/DepartmentHeader";

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
      Component: VolunteerReportsPage,
    },
    {
      id: "development",
      title: "Development Reports",
      Component: DevelopmentReports,
    },
    {
      id: "compliance",
      title: "Compliance Weekly Reports",
      Component: ComplianceReporting,
    },
    {
      id: "shelter",
      title: "Shelter Weekly Reports",
      Component: ShelterReporting,
    },
    {
      id: "finance",
      title: "Finance Weekly Reports",
      Component: FinanceReporting,
    },
  ];

  return (
    <div className="hub-container">
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

// import VolunteerReportsPage from "../CommunityOutreach/Reports/VolunteerReportsPage";
// import DevelopmentReports from "../Development/DevelopmentReports";
// import HousingReports from "../Housing/HousingReports";

// export default function ReportsDashboard() {
//   return (
//     <>
//       <h1>Reporting Hub</h1>
//       <p>work in progress...</p>
//       <VolunteerReportsPage />
//       <DevelopmentReports />
//       <HousingReports />
//     </>
//   );
// }
