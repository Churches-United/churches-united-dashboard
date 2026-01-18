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

  const roleOptions = ["Admin", "Department Manager", "Broad Member"];
  const departmentOptions = [
    "Outreach",
    "Development",
    "Housing",
    "Human Resource",
    "Shelter",
    "Pantry",
    "Media",
  ];

  // Populate form if editing
  useEffect(() => {
    if (record) {
      setFormData({
        username: record.username,
        password: "", // never prefill password
        email: record.email,
        firstName: record.first_name || "",
        lastName: record.last_name || "",
        role: record.role || "",
        department: record.department || "",
      });
    }
  }, [record]);

  // Clear auth error on unmount
  useEffect(() => {
    return () => setAuthErrorMessage("");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    const payload = {
      username: formData.username,
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      role: formData.role,
      department: formData.department || null,
    };

    if (!record) {
      // Include password when adding new user
      payload.password = formData.password;
      await register(payload);
      setFormData({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: "",
        role: "",
        department: "",
      });
      navigate("/admin");
    } else {
      await updateUser(record.id, payload);
      if (onClose) onClose();
    }
  };

  return (
    <div className="hub-container admin">
      <DepartmentHeader
        title={record ? "Admin - Edit User" : "Admin - Add User"}
        actions={
          <>
            <NavLink to="/admin" end>
              Admin Home
            </NavLink>
            <NavLink to="/admin/registration">Add User</NavLink>
            <NavLink to="/admin/users">Manage Users</NavLink>
          </>
        }
      />

      <div className="form">
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
          <select
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Select role...</option>
            {roleOptions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <label>Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            <option value="">Select department...</option>
            {departmentOptions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <div className="form-buttons">
            <button type="submit" className="primary">
              {record ? "Save Changes" : "Add User"}
            </button>

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
