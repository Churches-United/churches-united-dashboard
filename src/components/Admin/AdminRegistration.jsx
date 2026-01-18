import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useStore from "../../zustand/store";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";
import "./Admin.css";

export default function AdminRegistration({ record, onClose }) {
  const navigate = useNavigate();

  // Admin slice actions
  const addUser = useStore((state) => state.addUser);
  const updateUser = useStore((state) => state.updateUser);
  const errorMessage = useStore((state) => state.adminError);
  const clearAdminError = useStore((state) => state.clearAdminError);

  // Options for select fields
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

  // Form state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    department: "",
  });

  // Populate form if editing
  useEffect(() => {
    if (record) {
      setFormData({
        username: record.username || "",
        password: "", // never prefill password
        email: record.email || "",
        firstName: record.first_name || "",
        lastName: record.last_name || "",
        role: record.role || "",
        department: record.department || "",
      });
    }
  }, [record]);

  // Clear error on unmount
  useEffect(() => {
    return () => clearAdminError();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      username: formData.username,
      password: formData.password || undefined,
      email: formData.email,
      first_name: formData.firstName,
      last_name: formData.lastName,
      role: formData.role,
      department: formData.department || null,
    };

    try {
      if (record) {
        await updateUser(record.id, payload);
        if (onClose) onClose();
      } else {
        if (!payload.password) {
          alert("Password is required for new users");
          return;
        }
        await addUser(payload);

        // Clear form after success
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
      }
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <div className="hub-container admin">
      {/* Department Header outside form */}
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

      {/* Form Container */}
      <div className="admin-registration">
        <form onSubmit={handleSubmit}>
          {/* Username & Password */}
          <div className="form-row">
            <div className="form-field">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            {!record && (
              <div className="form-field">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          {/* First Name & Last Name */}
          <div className="form-row">
            <div className="form-field">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-field">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Role & Department */}
          <div className="form-row">
            <div className="form-field">
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
            </div>
            <div className="form-field">
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
            </div>
          </div>

          {/* Buttons */}
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

          {/* Error Message */}
          {errorMessage && <h3 className="error-message">{errorMessage}</h3>}
        </form>
      </div>
    </div>
  );
}
