import { Link, NavLink } from "react-router-dom";
import "../../styles/departmentCards.css";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import "./Admin.css";

export default function AdminHome() {
  return (
    <div className="hub-container admin">
      <DepartmentHeader
        title="Admin - Home"
        actions={
          <>
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Admin Home
            </NavLink>
            <NavLink
              to="/admin/registration"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Add User
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Manage Users
            </NavLink>
          </>
        }
      />

      <div className="department-cards-container">
        <Link to="/admin/registration" className="card-link-wrapper">
          <div className="department-card">
            <h4>Register a user</h4>
            <p>Create a new user account and assign roles.</p>
            <span className="btn btn-primary">Register</span>
          </div>
        </Link>

        <Link to="/admin/users" className="card-link-wrapper">
          <div className="department-card">
            <h4>User Management</h4>
            <p>Edit users, deactivate accounts, and manage roles.</p>
            <span className="btn btn-primary">Manage</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
