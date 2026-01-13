import { NavLink, Link } from "react-router-dom";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import "../../styles/departmentCards.css";

export default function DevelopmentHome() {
  return (
    <div className="hub-container">
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

      {/* Department Cards */}
      <div className="department-cards-container">
        {/* Donors */}
        <Link to="/development/donors" className="card-link-wrapper">
          <div className="department-card">
            <h4>Donors</h4>
            <p>Manage donor records, contact information, and donor history.</p>
            <span className="btn btn-primary">View Donors</span>
          </div>
        </Link>

        {/* Donations */}
        <Link to="/development/donations" className="card-link-wrapper">
          <div className="department-card">
            <h4>Donations</h4>
            <p>
              Track individual donations, amounts, dates, and associated donors.
            </p>
            <span className="btn btn-primary">View Donations</span>
          </div>
        </Link>

        {/* Events */}
        <Link to="/development/events" className="card-link-wrapper">
          <div className="department-card">
            <h4>Events</h4>
            <p>Create and manage fundraising events, venues, and attendance.</p>
            <span className="btn btn-primary">View Events</span>
          </div>
        </Link>

        {/* Reports */}
        <Link to="/development/reports" className="card-link-wrapper">
          <div className="department-card">
            <h4>Reports</h4>
            <p>
              Analyze donations, donor trends, events, and fundraising metrics.
            </p>
            <span className="btn btn-primary">View Reports</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
