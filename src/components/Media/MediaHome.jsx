import { NavLink, Link } from "react-router-dom";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import "../../styles/departmentCards.css";

export default function MediaHome() {
  return (
    <div className="hub-container">
      {/* Department Header */}
      <DepartmentHeader
        title="Media"
        actions={
          <>
            <NavLink
              to="/media"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Department Home
            </NavLink>
            <NavLink
              to="/media/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Reports
            </NavLink>
          </>
        }
      />

      {/* Department Cards */}
      <div className="department-cards-container">
        {/* Media */}
        <Link to="/media/data" className="card-link-wrapper">
          <div className="department-card">
            <h4>Media</h4>
            <p>Manage media records, files, and associated information.</p>
            <span className="btn btn-primary">View Media</span>
          </div>
        </Link>

        {/* Reports */}
        <Link to="/media/reports" className="card-link-wrapper">
          <div className="department-card">
            <h4>Reports</h4>
            <p>Analyze media usage, trends, and reporting data.</p>
            <span className="btn btn-primary">View Reports</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
