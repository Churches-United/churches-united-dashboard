import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../zustand/store";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import AdminUsersTable from "./AdminUsersTable";
import AdminRegistration from "../Admin/AdminRegistration";
import "./Admin.css";

export default function AdminUserManagement() {
  const fetchUsers = useStore((state) => state.fetchUsers);
  const users = useStore((state) => state.users);
  const loading = useStore((state) => state.usersLoading);
  const toggleUserActive = useStore((state) => state.toggleUserActive);

  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user);
  };

  const handleCloseForm = () => {
    setEditingUser(null);
    fetchUsers(); // refresh list after editing
  };

  return (
    <div className="hub-container admin">
      <DepartmentHeader
        title="Admin - Manage Users"
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

      <AdminUsersTable
        users={users}
        onEdit={handleEditClick}
        onToggleActive={toggleUserActive}
      />
      {/* Render form modal if editing */}
      <div className="admin-edit">
        {editingUser && (
          <AdminRegistration
            record={editingUser}
            onClose={() => {
              setEditingUser(null);
              fetchUsers(); // refresh table after editing
            }}
          />
        )}
      </div>
    </div>
  );
}
