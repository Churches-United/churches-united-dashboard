import { useState, useEffect } from "react";
import useStore from "../../../zustand/store";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";
import OutreachToolbar from "../OutreachToolBar";
import VolunteerForm from "./VolunteerForm";
import VolunteerList from "./VolunteerList";
import { NavLink } from "react-router-dom";
import "../CommunityOutreach.css";
import "../../Development/DevelopmentToolBar.css";

export default function VolunteersPage() {
  const fetchVolunteers = useStore((state) => state.fetchVolunteers);

  const [showModal, setShowModal] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    year: "",
    location: "",
  });

  useEffect(() => {
    fetchVolunteers();
  }, [fetchVolunteers]);

  const handleAdd = () => {
    setEditingVolunteer(null);
    setShowModal(true);
  };
  const handleEdit = (v) => {
    setEditingVolunteer(v);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);
  const handleClearFilters = () =>
    setFilters({ search: "", year: "", location: "" });

  return (
    <div className="hub-container outreach">
      <DepartmentHeader
        title="Community Outreach"
        actions={
          <>
            <NavLink
              to="/outreach"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Department Home
            </NavLink>
            <NavLink
              to="/outreach/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Reports
            </NavLink>
          </>
        }
      />
      <div className="toolbar-wrapper volunteer">
        <OutreachToolbar
          filters={filters}
          onFilterChange={setFilters}
          onClear={handleClearFilters}
        />

        <div className="toolbar-action-button">
          <button onClick={handleAdd}>
            Add Volunteer
          </button>
        </div>
      </div>

      <VolunteerList onEdit={handleEdit} filters={filters} />

      {showModal && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleClose}>
              &times;
            </button>
            <VolunteerForm
              volunteerToEdit={editingVolunteer}
              onFinish={handleClose}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// import useStore from "../../../zustand/store";
// import { useEffect, useState } from "react";
// import VolunteerForm from "./VolunteerForm";
// import VolunteerList from "./VolunteerList";

// export default function VolunteerPage() {
//   const fetchVolunteers = useStore((state) => state.fetchVolunteers);
//   const loading = useStore((state) => state.loading);
//   const [editingVolunteer, setEditingVolunteer] = useState(null);

//   useEffect(() => {
//     fetchVolunteers();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Volunteers</h2>

//       <VolunteerForm
//         volunteerToEdit={editingVolunteer}
//         onFinish={() => setEditingVolunteer(null)}
//       />

//       <VolunteerList onEdit={(v) => setEditingVolunteer(v)} />
//     </div>
//   );
// }
