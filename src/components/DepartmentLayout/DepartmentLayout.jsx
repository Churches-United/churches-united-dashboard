import { Link, Outlet } from "react-router-dom";
import "../DepartmentLayout/DepartmentLayout.css"


export default function DepartmentLayout({ title }) {
  return (
    <main>
      <h1>{title}</h1>

      <nav className="department-nav">
        <Link to="." end>Data Entry</Link>
        <Link to="reports">Reports</Link>
      </nav>
      <Outlet />
    </main>
  );
}
