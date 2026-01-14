import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../../zustand/store";
import DonorToolBar from "./DonorToolBar";
import DonorForm from "./DonorForm";
import DonorList from "./DonorList";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";

import "../../../styles/modal.css";
import "./Donors.css";

export default function DonorsPage() {
  // --- Store ---
  const fetchDonors = useStore((state) => state.fetchDonors);
  const addDonor = useStore((state) => state.addDonor);
  const editDonor = useStore((state) => state.editDonor);
  const deleteDonor = useStore((state) => state.deleteDonor);

  const donors = useStore((state) => state.donors);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);

  // --- Modal / form state ---
  const [showModal, setShowModal] = useState(false);
  const [editingDonor, setEditingDonor] = useState(null);

  // --- Toolbar filters ---
  const [filters, setFilters] = useState({ name: "", type: "" });

  // --- Fetch donors ---
  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  // --- Handlers ---
  const handleAddClick = () => {
    setEditingDonor(null);
    setShowModal(true);
  };

  const handleEdit = (donor) => {
    setEditingDonor(donor);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donor?")) return;
    await deleteDonor(id);
    await fetchDonors(); // refresh after deletion
  };

  const handleSubmit = async (data) => {
    if (editingDonor) {
      await editDonor(editingDonor.id, data);
    } else {
      await addDonor(data);
    }
    setShowModal(false);
    await fetchDonors(); // refresh table after add/edit
  };

  // --- Filter donors based on toolbar selections ---
  const filteredDonors = donors.filter((d) => {
    if (filters.name && d.name !== filters.name) return false;
    if (filters.type && d.type !== filters.type) return false;
    return true;
  });

  if (loading) return <p>Loading donors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="hub-container donors">
      {/* Department Header */}
      <DepartmentHeader
        title="Donors"
        actions={
          <>
            <NavLink
              to="/development"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/development/reports"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Reports
            </NavLink>
          </>
        }
      />

      {/* Toolbar + Add button wrapper */}
      <div className="toolbar-wrapper">
        <DonorToolBar
          tableData={donors}
          filters={filters}
          setFilters={setFilters}
          rightButtons={[
            {
              label: "Clear",
              onClick: () => setFilters({ name: "", type: "" }),
            },
          ]}
        />

        <div className="toolbar-action-button">
          <button onClick={handleAddClick}>Add Donor</button>
        </div>
      </div>

      {/* Donor table */}
      <DonorList
        donors={filteredDonors}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal for Add/Edit */}
      {showModal && (
        <div
          className="modal-overlay development-modal"
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-container development-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>

            <h3>{editingDonor ? "Edit Donor" : "Add Donor"}</h3>

            <DonorForm
              initialData={editingDonor}
              onSubmit={handleSubmit}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
