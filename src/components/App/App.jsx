import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "../../styles/tables.css";
import useStore from "../../zustand/store";
import Nav from "../Nav/Nav";

import HomePage from "../HomePage/HomePage";
import AboutPage from "../AboutPage/AboutPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import DonorsPage from "../Development/Donors/Donors";
import Events from "../Development/Events/Events";
import ComplianceWeeklyList from "../ComplianceWeekly/ComplianceWeeklyList";
import ComplianceWeeklyForm from "../ComplianceWeekly/ComplianceWeeklyForm";
import ComplianceReporting from "../ComplianceWeekly/ComplianceReporting";
import KitchenPage from "../kitchen/kitchenPage";
import HousingHome from "../Housing/HousingHome";
import HousingReports from "../Housing/HousingReports";
import ShelterWeeklyList from "../shelter/ShelterWeeklyList";
import ShelterWeeklyForm from "../shelter/ShelterWeeklyForm";
import ShelterReporting from "../shelter/ShelterReporting";
import DepartmentLayout from "../DepartmentLayout/DepartmentLayout";
import DevelopmentHome from "../Development/DevelopmentHome";
import DevelopmentReports from "../Development/DevelopmentReports";
import PantryPage from "../pantry/PantryPage";
import DonationsPage from "../Development/Donors/DonationsPage";
import FinanceWeeklyList from "../Finance/FinanceWeeklyList";
import FinanceWeeklyForm from "../Finance/FinanceWeeklyForm";
import FinanceReporting from "../Finance/FinanceReporting";
import VolunteerPage from "../CommunityOutreach/Volunteer/VolunteerPage";
import HRHome from "../HR/HRHome";
import HRWeeklyList from "../HR/HRWeeklyList";
import HRWeeklyForm from "../HR/HRWeeklyForm";
import HRReports from "../HR/HRReports";
import OutreachHome from "../CommunityOutreach/OutreachHome";
import VolunteerEngagementPage from "../CommunityOutreach/Volunteer/VolunteerEngagementPage";
import VolunteerReportsPage from "../CommunityOutreach/Reports/VolunteerReportsPage";
import MediaPage from "../Media/MediaPage";
import ReportsDashboard from "../ReportingHub/ReportsDashboard";
import MediaReports from "../Media/Reports/MediaReports";

function App() {
  const user = useStore((state) => state.user);
  const fetchUser = useStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <header>
        {/* <h2>Churches United Dashboard</h2> */}
        <Nav />
      </header>
      <main>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user.id ? (
                <HomePage /> // Render HomePage for authenticated user.
              ) : (
                <Navigate to="/login" replace /> // Redirect unauthenticated user.
              )
            }
          />
          <Route
            exact
            path="/login"
            element={
              user.id ? (
                <Navigate to="/" replace /> // Redirect authenticated user.
              ) : (
                <LoginPage /> // Render LoginPage for unauthenticated user.
              )
            }
          />
          <Route
            exact
            path="/registration"
            element={
              user.id ? (
                <Navigate to="/" replace /> // Redirect authenticated user.
              ) : (
                <RegisterPage /> // Render RegisterPage for unauthenticated user.
              )
            }
          />
          <Route exact path="/about" element={<AboutPage />} />
          {/* <Route path="/housing" element={<DepartmentLayout title="Housing" />}>
            <Route index element={<HousingHome />} />
            <Route path="reports" element={<HousingReports />} />
          </Route> */}
          <Route path="/housing" element={<HousingHome />} />
          <Route path="/housing/reports" element={<HousingReports />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/media/reports" element={<MediaReports />} />
          <Route
            path="/development"
            element={<DepartmentLayout title="Development Dashboard" />}
          >
            <Route index element={<DevelopmentHome />} />
            <Route path="donors" element={<DonorsPage />} />
            <Route path="donations" element={<DonationsPage />} />
            <Route path="events" element={<Events />} />
            <Route path="reports" element={<DevelopmentReports />} />
          </Route>
          <Route
            path="/outreach"
            element={<DepartmentLayout title="Community Outreach Dashboard" />}
          >
            <Route index element={<OutreachHome />} />
            <Route path="volunteers" element={<VolunteerPage />} />
            <Route path="engagements" element={<VolunteerEngagementPage />} />
            <Route path="reports" element={<VolunteerReportsPage />} />
          </Route>

          <Route path="/media" element={<h2>Media</h2>} />
          <Route path="/kitchen" element={<KitchenPage />} />

          <Route path="/outreach" element={<h2>Volunteers</h2>} />
          <Route path="/compliance" element={<ComplianceWeeklyList />} />
          <Route
            path="/compliance/weekly/new"
            element={<ComplianceWeeklyForm />}
          />
          <Route
            path="/compliance/weekly/edit/:id"
            element={<ComplianceWeeklyForm />}
          />
          <Route path="/compliance/reports" element={<ComplianceReporting />} />
          <Route path="/shelter" element={<ShelterWeeklyList />} />
          <Route path="/shelter/weekly/new" element={<ShelterWeeklyForm />} />
          <Route
            path="/shelter/weekly/edit/:id"
            element={<ShelterWeeklyForm />}
          />
          <Route path="/shelter/reports" element={<ShelterReporting />} />

          <Route path="/finance" element={<FinanceWeeklyList />} />
          <Route path="/finance/weekly/new" element={<FinanceWeeklyForm />} />
          <Route
            path="/finance/weekly/edit/:id"
            element={<FinanceWeeklyForm />}
          />
          <Route path="/finance/reports" element={<FinanceReporting />} />

          <Route path="/pantry" element={<PantryPage />} />
          <Route path="/reporting" element={<ReportsDashboard />} />
          <Route path="/hr" element={<DepartmentLayout title="Human Resources" />}>
  <Route index element={<HRHome />} />
  <Route path="weekly" element={<HRWeeklyList />} />
  <Route path="weekly/new" element={<HRWeeklyForm />} />
  <Route path="weekly/edit/:id" element={<HRWeeklyForm />} />
  <Route path="reports" element={<HRReports />} />
</Route>
        </Routes>
      </main>
      <footer>
        <p>Copyright © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}

export default App;
