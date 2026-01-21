import { NavLink, Link } from "react-router-dom";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import "../../styles/departmentCards.css";

export default function HousingHome() {
  return (
    <div className="hub-container housing">
      {/* Department Header */}
      <DepartmentHeader
        title="Housing"
        actions={
          <>
            <NavLink
              to="/housing"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Department Home
            </NavLink>
            <NavLink
              to="/housing/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Reports
            </NavLink>
          </>
        }
      />

      {/* Department Cards */}
      <div className="department-cards-container">
        {/* Housing */}
        <Link to="/housing/data" className="card-link-wrapper">
          <div className="department-card">
            <h4>Housing</h4>
            <p>Manage housing records, tenant information, and occupancy.</p>
            <span className="btn btn-primary">View Housing</span>
          </div>
        </Link>

        {/* Reports */}
        <Link to="/housing/reports" className="card-link-wrapper">
          <div className="department-card">
            <h4>Reports</h4>
            <p>
              Analyze housing metrics, occupancy trends, and reporting data.
            </p>
            <span className="btn btn-primary">View Reports</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
