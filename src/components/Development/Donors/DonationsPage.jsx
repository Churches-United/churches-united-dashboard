import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../../zustand/store";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";
import DonationForm from "./DonationForm";
import DonationList from "./DonationList";

import "../../../styles/modal.css";
import "./Donors.css";

export default function DonationsPage() {
  // --- Store ---
  const fetchDonations = useStore((s) => s.fetchDonations);
  const addDonation = useStore((s) => s.addDonation);
  const editDonation = useStore((s) => s.editDonation);
  const deleteDonation = useStore((s) => s.deleteDonation);

  const donations = useStore((s) => s.donations);
  const donors = useStore((s) => s.donors);
  const fetchDonors = useStore((s) => s.fetchDonors);

  const loading = useStore((s) => s.loading);
  const error = useStore((s) => s.error);

  // --- Modal / form state ---
  const [showModal, setShowModal] = useState(false);
  const [editingDonation, setEditingDonation] = useState(null);

  // --- Fetch data ---
  useEffect(() => {
    fetchDonations();
    fetchDonors();
  }, [fetchDonations, fetchDonors]);

  // --- Handlers ---
  const handleAddClick = () => {
    setEditingDonation(null);
    setShowModal(true);
  };

  const handleEdit = (donation) => {
    setEditingDonation(donation);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donation?"))
      return;
    await deleteDonation(id);
    await fetchDonations(); // refresh table after deletion
  };

  const handleSubmit = async (data) => {
    if (editingDonation) {
      await editDonation(editingDonation.id, data);
    } else {
      await addDonation(data);
    }
    setShowModal(false);
    await fetchDonations(); // refresh table after add/edit
  };

  if (loading) return <p>Loading donations...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="hub-container donations">
      {/* Department Header */}
      <DepartmentHeader
        title="Donations"
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

      {/* Top action button */}
      <div className="toolbar-actions-top">
        <button onClick={handleAddClick}>Add Donation</button>
      </div>

      {/* Table */}
      <DonationList
        donations={donations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>

            <h3>{editingDonation ? "Edit Donation" : "Add Donation"}</h3>

            <DonationForm
              donors={donors}
              initialData={editingDonation}
              onSubmit={handleSubmit}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
