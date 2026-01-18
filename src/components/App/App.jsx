import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "../../styles/tables.css";
import useStore from "../../zustand/store";
import Nav from "../Nav/Nav";

import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";

import DonorsPage from "../Development/Donors/DonorsPage";
import EventsPage from "../Development/Events/EventsPage";
import DevelopmentHome from "../Development/DevelopmentHome";
import DevelopmentReportsPage from "../Development/DevelopmentReportsPage";
import DonationsPage from "../Development/Donors/DonationsPage";

import ComplianceHome from "../ComplianceWeekly/ComplianceHome";
import ComplianceWeeklyList from "../ComplianceWeekly/ComplianceWeeklyList";
import ComplianceWeeklyForm from "../ComplianceWeekly/ComplianceWeeklyForm";
import ComplianceReporting from "../ComplianceWeekly/ComplianceReporting";

import KitchenHome from "../kitchen/KitchenHome";
import KitchenWeeklyList from "../kitchen/KitchenWeeklyList";
import KitchenWeeklyForm from "../kitchen/KitchenWeeklyForm";
import KitchenReports from "../kitchen/KitchenReports";

import HousingHome from "../Housing/HousingHome";
import HousingReports from "../Housing/HousingReports";
import HousingPage from "../Housing/HousingPage";

import ShelterHome from "../shelter/ShelterHome";
import ShelterWeeklyList from "../shelter/ShelterWeeklyList";
import ShelterWeeklyForm from "../shelter/ShelterWeeklyForm";
import ShelterReporting from "../shelter/ShelterReporting";

import FinanceHome from "../Finance/FinanceHome";
import FinanceWeeklyList from "../Finance/FinanceWeeklyList";
import FinanceWeeklyForm from "../Finance/FinanceWeeklyForm";
import FinanceReporting from "../Finance/FinanceReporting";

import VolunteerPage from "../CommunityOutreach/Volunteer/VolunteerPage";
import VolunteerEngagementPage from "../CommunityOutreach/Volunteer/VolunteerEngagementPage";
import CommunityOutreachReportsPage from "../CommunityOutreach/Reports/CommunityOutreachReportsPage";
import CommunityOutreachHome from "../CommunityOutreach/CommunityOutreachHome";

import MediaPage from "../Media/MediaPage";
import MediaReports from "../Media/Reports/MediaReports";
import MediaHome from "../Media/MediaHome";

import HRHome from "../HR/HRHome";
import HRWeeklyList from "../HR/HRWeeklyList";
import HRWeeklyForm from "../HR/HRWeeklyForm";
import HRReports from "../HR/HRReports";

import PantryHome from "../pantry/PantryHome";
import PantryWeeklyList from "../pantry/PantryWeeklyList";
import PantryWeeklyForm from "../pantry/PantryWeeklyForm";
import PantryReports from "../pantry/PantryReports";

import AdminHome from "../Admin/AdminHome";
import AdminRegistration from "../Admin/AdminRegistration";
import AdminUserManagement from "../Admin/AdminUserManagement";
import UserSettings from "../Admin/UserSettings/UserSettings";

import ReportsDashboard from "../ReportingHub/ReportsDashboard";
import Footer from "../Nav/Footer";

function App() {
  const user = useStore((state) => state.user);
  const fetchUser = useStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route
            exact
            path="/"
            element={user.id ? <HomePage /> : <Navigate to="/login" replace />}
          />
          <Route
            exact
            path="/login"
            element={user.id ? <Navigate to="/" replace /> : <LoginPage />}
          />
          {/* Admin */}
          <Route exact path="/admin" element={<AdminHome />} />
          <Route exact path="/admin/registration" element={<AdminRegistration />} />
          <Route exact path="/admin/users" element={<AdminUserManagement />} />
          
          {/* User Settings */}
          <Route exact path="/user/settings" element={<UserSettings />} />



          {/* Housing */}
          <Route path="/housing" element={<HousingHome />} />
          <Route path="/housing/data" element={<HousingPage />} />
          <Route path="/housing/reports" element={<HousingReports />} />

          {/* Media */}
          <Route path="/media" element={<MediaHome />} />
          <Route path="/media/data" element={<MediaPage />} />
          <Route path="/media/reports" element={<MediaReports />} />

          {/* Development */}
          <Route path="/development" element={<DevelopmentHome />} />
          <Route path="/development/donors" element={<DonorsPage />} />
          <Route path="/development/donations" element={<DonationsPage />} />
          <Route path="/development/events" element={<EventsPage />} />
          <Route path="/development/reports" element={<DevelopmentReportsPage />} />

          {/* Outreach */}
          <Route path="/outreach" element={<CommunityOutreachHome />} />
          <Route path="/outreach/volunteers" element={<VolunteerPage />} />
          <Route
            path="/outreach/engagements"
            element={<VolunteerEngagementPage />}
          />
          <Route
            path="/outreach/reports"
            element={<CommunityOutreachReportsPage />}
          />

          {/* Kitchen */}

          {/* Compliance */}
          <Route path="/compliance" element={<ComplianceHome />} />
          <Route path="/compliance/weekly" element={<ComplianceWeeklyList />} />
          <Route
            path="/compliance/weekly/new"
            element={<ComplianceWeeklyForm />}
          />
          <Route
            path="/compliance/weekly/edit/:id"
            element={<ComplianceWeeklyForm />}
          />
          <Route path="/compliance/reports" element={<ComplianceReporting />} />

          {/* Shelter */}
          <Route path="/shelter" element={<ShelterHome />} />
          <Route path="/shelter/weekly" element={<ShelterWeeklyList />} />
          <Route path="/shelter/weekly/new" element={<ShelterWeeklyForm />} />
          <Route
            path="/shelter/weekly/edit/:id"
            element={<ShelterWeeklyForm />}
          />
          <Route path="/shelter/reports" element={<ShelterReporting />} />

          {/* Finance */}
          <Route path="/finance" element={<FinanceHome />} />
          <Route path="/finance/weekly" element={<FinanceWeeklyList />} />
          <Route path="/finance/weekly/new" element={<FinanceWeeklyForm />} />
          <Route
            path="/finance/weekly/edit/:id"
            element={<FinanceWeeklyForm />}
          />
          <Route path="/finance/reports" element={<FinanceReporting />} />

          {/* Reporting Hub */}
          <Route path="/reporting" element={<ReportsDashboard />} />

          {/* HR */}
          <Route path="/hr" element={<HRHome />} />
          <Route path="/hr/weekly" element={<HRWeeklyList />} />
          <Route path="/hr/weekly/new" element={<HRWeeklyForm />} />
          <Route path="/hr/weekly/edit/:id" element={<HRWeeklyForm />} />
          <Route path="/hr/reports" element={<HRReports />} />

          {/* Pantry */}
          <Route path="/pantry" element={<PantryHome />} />
          <Route path="/pantry/weekly" element={<PantryWeeklyList />} />
          <Route path="/pantry/weekly/new" element={<PantryWeeklyForm />} />
          <Route
            path="/pantry/weekly/edit/:id"
            element={<PantryWeeklyForm />}
          />
          <Route path="/pantry/reports" element={<PantryReports />} />

          {/* Kitchen */}
          <Route path="/kitchen" element={<KitchenHome />} />
          <Route path="/kitchen/weekly" element={<KitchenWeeklyList />} />
          <Route path="/kitchen/weekly/new" element={<KitchenWeeklyForm />} />
          <Route
            path="/kitchen/weekly/edit/:id"
            element={<KitchenWeeklyForm />}
          />
          <Route path="/kitchen/reports" element={<KitchenReports />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
