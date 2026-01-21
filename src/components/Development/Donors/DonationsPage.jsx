import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../../zustand/store";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";
import DonationForm from "./DonationForm";
import DonationList from "./DonationList";
import DonationToolBar from "./DonationToolbar";

import "../../../styles/modal.css";
import "./Donors.css";
import "../DevelopmentToolBar.css";

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

  // --- Toolbar filter state ---
  const [filters, setFilters] = useState({
    donor: "",
    notable: false,
    restricted: false,
    search: "",
  });

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

  // --- Filter donations ---
  const filteredDonations = donations.filter((d) => {
    if (filters.donor && d.donor_name !== filters.donor) return false;
    if (filters.notable && !d.notable) return false;
    if (filters.restricted && !d.restricted) return false;
    if (
      filters.search &&
      !d.notes?.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

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
              Department Home
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

      {/* Toolbar + Add Button wrapper */}
      <div className="toolbar-wrapper">
        <DonationToolBar
          tableData={donations}
          filters={filters}
          setFilters={setFilters}
          rightButtons={[
            {
              label: "Clear",
              onClick: () =>
                setFilters({
                  donor: "",
                  notable: false,
                  restricted: false,
                  search: "",
                }),
            },
          ]}
        />

        <div className="toolbar-action-button">
          <button onClick={handleAddClick}>Add Donation</button>
        </div>
      </div>

      {/* Table */}
      <DonationList
        donations={filteredDonations}
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
