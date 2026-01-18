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
    await updatePassword(passwordData);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="hub-container user-settings">
      <DepartmentHeader title="User Settings" />
      <h2>Profile</h2>
      <form onSubmit={handleProfileSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
        />
        <button type="submit">Save Profile</button>
      </form>

      <h2>Change Password</h2>
      <form onSubmit={handlePasswordSubmit}>
        <label>Current Password:</label>
        <input
          type="password"
          value={passwordData.currentPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              currentPassword: e.target.value,
            })
          }
        />
        <label>New Password:</label>
        <input
          type="password"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, newPassword: e.target.value })
          }
        />
        <label>Confirm New Password:</label>
        <input
          type="password"
          value={passwordData.confirmPassword}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              confirmPassword: e.target.value,
            })
          }
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}
