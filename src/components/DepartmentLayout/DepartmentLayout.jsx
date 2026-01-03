import { NavLink, Outlet } from "react-router-dom";

export default function DepartmentLayout({ title }) {
  return (
    <section>
      <header>
        <h2>{title}</h2>

        <nav className="section-nav">
          <NavLink to="" end>
            Data Entry
          </NavLink>
          <NavLink to="reports">
            Reports
          </NavLink>
        </nav>
      </header>

      <div className="section-content">
        <Outlet />
      </div>
    </section>
  );
}
