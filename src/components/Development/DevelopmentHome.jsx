import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";

export default function DevelopmentHome() {
  return (
    <div className="hub-container">
      <DepartmentHeader
        title="Development"
        actions={
          <>
            <NavLink to="/development" className={({ isActive }) => isActive ? "active" : ""}>
              Data Entry
            </NavLink>
            <NavLink to="/development/reports" className={({ isActive }) => isActive ? "active" : ""}>
              Reports
            </NavLink>
          </>
        }
      />
      <nav>
        <ul>
          <li>
            <Link to="donors">Donors</Link>
          </li>
          <li>
            <Link to="donations">Donations</Link>
          </li>
          <li>
            <Link to="events">Events</Link>
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
