import { Link, Outlet } from "react-router-dom";
export default function DepartmentLayout({ title }) {
  return (
    <main className="department-layout">
      <header className="department-header">
        <h1>{title}</h1>

        <nav className="department-nav">
          <Link to="." end>Data Entry</Link>
          <Link to="reports">Reports</Link>
        </nav>
      </header>

      <div className="department-divider" />

      <section className="department-content">
        <Outlet />
      </section>
    </main>
  );
}

