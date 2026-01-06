import React from "react";
import Accordion from "react-bootstrap/Accordion";
import VolunteerReportsPage from "../CommunityOutreach/Reports/VolunteerReportsPage";
import DevelopmentReports from "../Development/DevelopmentReports";
import HousingReports from "../Housing/HousingReports";

export default function ReportsDashboard() {
  // Dynamic array of report sections
  const reportSections = [
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
    { id: "housing", title: "North Campus Housing Reports", Component: HousingReports },
  ];

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Reporting Hub</h1>
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