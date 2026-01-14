import { useState, useEffect } from "react";
import useStore from "../../../zustand/store";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";
import OutreachToolbar from "../OutreachToolBar";
import { NavLink } from "react-router-dom";
import VolunteerEngagementList from "./VolunteerEngagementList";
import VolunteerEngagementForm from "./VolunteerEngagementForm";
import { FaPlus } from "react-icons/fa";

export default function VolunteerEngagementsPage() {
  const fetchEngagements = useStore((state) => state.fetchEngagements);

  const [showModal, setShowModal] = useState(false);
  const [editingEngagementId, setEditingEngagementId] = useState(null);
  const [filters, setFilters] = useState({
    volunteerId: "",
    year: "",
    location: "",
  });

  useEffect(() => {
    fetchEngagements();
  }, [fetchEngagements]);

  const handleAdd = () => {
    setEditingEngagementId(null);
    setShowModal(true);
  };
  const handleEdit = (id) => {
    setEditingEngagementId(id);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);
  const handleClearFilters = () =>
    setFilters({ volunteerId: "", year: "", location: "" });

  return (
    <div className="hub-container vol-engagement">
      <DepartmentHeader
        title="Community Outreach"
        actions={
          <>
            <NavLink
              to="/outreach"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
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
          <button onClick={handleAdd}>Add Volunteer Engagement</button>
        </div>
      </div>
      <VolunteerEngagementList onEdit={handleEdit} filters={filters} />

      {showModal && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleClose}>
              &times;
            </button>
            <VolunteerEngagementForm
              editId={editingEngagementId}
              setEditId={handleClose}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import useStore from "../../../zustand/store";
// import VolunteerEngagementForm from "./VolunteerEngagementForm";

// export default function VolunteerEngagementPage() {
//   const fetchEngagements = useStore((state) => state.fetchEngagements);
//   const engagements = useStore((state) => state.engagements);
//   const loadingEngagements = useStore((state) => state.loadingEngagements);
//   const errorEngagements = useStore((state) => state.errorEngagements);
//   const deleteEngagement = useStore((state) => state.deleteEngagement);

//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchEngagements();
//   }, [fetchEngagements]);

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this engagement?")) {
//       await deleteEngagement(id);
//     }
//   };

//   if (loadingEngagements) return <p>Loading engagements...</p>;
//   if (errorEngagements) return <p>Error: {errorEngagements}</p>;

//   return (
//     <div>
//       <h2>Volunteer Engagements</h2>

//       <VolunteerEngagementForm editId={editId} setEditId={setEditId} />

//       {engagements.length === 0 ? (
//         <p>No engagements logged.</p>
//       ) : (
//         <div className="table-container" style={{ maxWidth: "1200px" }}>
//           <table className="table-app table-hover table-striped">
//             <thead>
//               <tr>
//                 <th>Volunteer</th>
//                 <th>Event Date</th>
//                 <th>Location</th>
//                 <th>Number of Volunteers</th>
//                 <th>Software Signups</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {engagements.map((e) => (
//                 <tr key={e.id}>
//                   <td>{e.volunteer_name}</td>
//                   <td>{new Date(e.event_date).toLocaleDateString()}</td>
//                   <td>{e.location}</td>
//                   <td>{e.number_volunteers}</td>
//                   <td>{e.software_signups || 0}</td>
//                   <td>
//                     <div className="table-actions">
//                       <button
//                         className="btn btn-sm btn-table-edit"
//                         onClick={() => setEditId(e.id)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-sm btn-table-delete"s
//                         onClick={() => handleDelete(e.id)}
//                         style={{ marginLeft: "0.5rem" }}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
