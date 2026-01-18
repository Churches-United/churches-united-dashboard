import { useState, useEffect } from "react";
import useStore from "../../../zustand/store";
import "./UserSettings.css";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";

export default function UserSettings() {
  const user = useStore((state) => state.user);
  const updateProfile = useStore((state) => state.updateProfile);
  const updatePassword = useStore((state) => state.updatePassword);

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const success = await updatePassword({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });

    if (success) {
      alert("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <div className="hub-container user-settings">
      <DepartmentHeader title="User Settings" />

      <div className="user-settings-form-container">
        {/* ---------- Profile Form ---------- */}
        <form className="user-profile-form" onSubmit={handleProfileSubmit}>
          <h3 className="form-section-title">Profile</h3>
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">First Name:</label>
              <input
                className="form-input"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div className="form-field">
              <label className="form-label">Last Name:</label>
              <input
                className="form-input"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-field">
            <label className="form-label">Email:</label>
            <input
              className="form-input"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <button className="primary-btn" type="submit">
            Save Profile
          </button>
        </form>

        {/* ---------- Divider ---------- */}
        <div className="form-divider" />

        {/* ---------- Password Form ---------- */}
        <form className="user-password-form" onSubmit={handlePasswordSubmit}>
          <h3 className="form-section-title">Change Password</h3>

          <div className="form-field">
            <label className="form-label">Current Password:</label>
            <input
              className="form-input"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
            />
          </div>

          <div className="form-field">
            <label className="form-label">New Password:</label>
            <input
              className="form-input"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
            />
          </div>

          <div className="form-field">
            <label className="form-label">Confirm New Password:</label>
            <input
              className="form-input"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          <button className="primary-btn" type="submit">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
