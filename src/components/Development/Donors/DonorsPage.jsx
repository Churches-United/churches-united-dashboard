import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../../zustand/store";
import { FaEdit, FaTrash } from "react-icons/fa";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";
import "../../../styles/modal.css";
import "./Donors.css";

export default function DonorsPage() {
  // --- Store ---
  const fetchDonors = useStore((state) => state.fetchDonors);
  const addDonor = useStore((state) => state.addDonor);
  const deleteDonor = useStore((state) => state.deleteDonor);
  const editDonor = useStore((state) => state.editDonor);
  const donors = useStore((state) => state.donors);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);

  // --- Modal / form state ---
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("Individual");

  // --- Fetch donors ---
  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  // --- Handlers ---
  const handleAddClick = () => {
    setEditId(null);
    setName("");
    setType("Individual");
    setShowModal(true);
  };

  const handleEdit = (donor) => {
    setEditId(donor.id);
    setName(donor.name);
    setType(donor.type);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const nameExists =
      !editId &&
      donors.some((d) => d.name.toLowerCase() === name.trim().toLowerCase());

    if (nameExists) {
      alert("A donor with this name already exists.");
      return;
    }

    if (editId) {
      await editDonor(editId, name, type);
    } else {
      await addDonor(name, type);
    }

    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this donor? All history will be lost."
      )
    ) {
      await deleteDonor(id);
    }
  };

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

      {/* Top action buttons */}
      <div className="toolbar-actions-top">
        <button onClick={handleAddClick}>Add Donor</button>
      </div>

      {/* Table */}
      {donors.length === 0 ? (
        <p>No donors found.</p>
      ) : (
        <div className="table-container">
          <table className="table-app table-hover table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor.id}>
                  <td>{donor.name}</td>
                  <td>{donor.type}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn btn-sm btn-table-edit"
                        onClick={() => handleEdit(donor)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-table-delete"
                        onClick={() => handleDelete(donor.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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

            <h3>{editId ? "Edit Donor" : "Add Donor"}</h3>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Individual">Individual</option>
                <option value="Organization">Organization</option>
                <option value="Corporate">Corporate</option>
              </select>

              <div className="modal-actions">
                <button type="submit">{editId ? "Update" : "Add"} Donor</button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
