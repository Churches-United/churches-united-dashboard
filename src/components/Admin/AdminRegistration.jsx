import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../zustand/store";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import { NavLink } from "react-router-dom";
import "./Admin.css";

export default function AdminRegistration({ record, onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    department: "",
  });

  const register = useStore((state) => state.register);
  const updateUser = useStore((state) => state.updateUser);
  const errorMessage = useStore((state) => state.authErrorMessage);
  const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

  // populate form if editing
  useEffect(() => {
    if (record) {
      setFormData({
        username: record.username,
        password: "", 
        email: record.email,
        firstName: record.first_name,
        lastName: record.last_name,
        role: record.role,
        department: record.department,
      });
    }
  }, [record]);

  useEffect(() => {
    return () => setAuthErrorMessage("");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (record) {
      // Editing existing user
      await updateUser(record.id, formData);
      if (onClose) onClose(); 
    } else {
      // Adding new user
      await register(formData);
      // clear form
      setFormData({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        role: "",
        department: "",
      });
      // navigate back to admin home
      navigate("/admin");
    }
  };

  return (
    <div className="hub-container admin">
      <DepartmentHeader
        title="Admin - Add User"
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

      <div className="form">
        <h2>{record ? "Edit User" : "Add User"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />

          {!record && (
            <>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </>
          )}

          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
          />

          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
          />

          <label>Role:</label>
          <input
            type="text"
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
          />

          <label>Department:</label>
          <input
            type="text"
            name="department"
            required
            value={formData.department}
            onChange={handleChange}
          />

          <div className="form-buttons">
            <button type="submit" className="primary">
              {record ? "Save Changes" : "Add User"}
            </button>

            {/* Only show Cancel if editing */}
            {record && (
              <button type="button" className="secondary" onClick={onClose}>
                Cancel
              </button>
            )}
          </div>

          {errorMessage && <h3>{errorMessage}</h3>}
        </form>
      </div>
    </div>
  );
}
