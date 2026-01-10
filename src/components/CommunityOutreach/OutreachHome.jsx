import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";

export default function OutreachHome() {
  return (
    <div className="hub-container">
      <DepartmentHeader
        title="Community Outreach"
        actions={
          <>
            <NavLink to="/outreach" className={({ isActive }) => isActive ? "active" : ""}>
              Data Entry
            </NavLink>
            <NavLink to="/outreach/reports" className={({ isActive }) => isActive ? "active" : ""}>
              Reports
            </NavLink>
          </>
        }
      />
      <nav>
        <ul>
          <li>
            <Link to="volunteers">Volunteers</Link>
          </li>
          <li>
            <Link to="engagements">Volunteer Engagement</Link>
          </li>
        </ul>
      </nav>

      <section style={{ marginTop: "2rem" }}>
        <h3>Quick Overview</h3>
        <p>Summary metrics/graphs/cards coming soon.</p>
      </section>
    </div>
  );
}
