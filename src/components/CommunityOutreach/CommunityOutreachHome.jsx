import { NavLink, Link } from "react-router-dom";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import "../../styles/departmentCards.css";

export default function CommunityOutreachHome() {
  return (
    <div className="hub-container">
      {/* Department Header */}
      <DepartmentHeader
        title="Community Outreach"
        actions={
          <>
            <NavLink
              to="/outreach"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Department Home
            </NavLink>
            <NavLink
              to="/outreach/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Reports
            </NavLink>
          </>
        }
      />

      {/* Department Cards */}
      <div className="department-cards-container">
        {/* Volunteers */}
        <Link to="/outreach/volunteers" className="card-link-wrapper">
          <div className="department-card">
            <h4>Volunteers</h4>
            <p>
              Manage volunteer records, contact information, and availability.
            </p>
            <span className="btn btn-primary">View Volunteers</span>
          </div>
        </Link>

        <Link to="/outreach/engagements" className="card-link-wrapper">
          <div className="department-card">
            <h4>Volunteer Engagements</h4>
            <p>
              Track volunteer participation, assignments, and event attendance.
            </p>
            <span className="btn btn-primary">View Engagements</span>
          </div>
        </Link>

        <Link to="/outreach/reports" className="card-link-wrapper">
          <div className="department-card">
            <h4>Reports</h4>
            <p>
              Analyze volunteer activity, engagement trends, and program
              metrics.
            </p>
            <span className="btn btn-primary">View Reports</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
