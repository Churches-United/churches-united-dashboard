import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../../zustand/store";
import { FaEdit, FaTrash } from "react-icons/fa";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";

import "../../../styles/modal.css";
import "../Donors/Donors.css";

const EVENT_TYPES = [
  "Fundraiser",
  "Community Events",
  "Large Volunteer Event",
  "Other",
];

export default function EventsPage() {
  // --- Store ---
  const fetchEvents = useStore((state) => state.fetchEvents);
  const addEvent = useStore((state) => state.addEvent);
  const editEvent = useStore((state) => state.editEvent);
  const deleteEvent = useStore((state) => state.deleteEvent);

  const events = useStore((state) => state.events);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);

  // --- Modal / form state ---
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [venue, setVenue] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");

  // --- Fetch events ---
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // --- Helpers ---
  const resetForm = () => {
    setEditId(null);
    setName("");
    setDatetime("");
    setVenue("");
    setType("");
    setNotes("");
  };

  // --- Handlers ---
  const handleAddClick = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (event) => {
    setEditId(event.id);
    setName(event.name);
    setDatetime(event.datetime.slice(0, 16));
    setVenue(event.venue);
    setType(event.type);
    setNotes(event.notes || "");
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !datetime || !venue || !type) {
      alert("Name, date/time, venue, and type are required");
      return;
    }

    const payload = { name, datetime, venue, type, notes };

    if (editId) {
      await editEvent(editId, payload);
    } else {
      await addEvent(payload);
    }

    setShowModal(false);
    resetForm();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    await deleteEvent(id);
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="hub-container events">
      {/* Department Header */}
      <DepartmentHeader
        title="Events"
        actions={
          <>
            <NavLink
              to="/development"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Data Entry
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
        <button onClick={handleAddClick}>Add Event</button>
      </div>

      {/* Table */}
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="table-container" style={{ maxWidth: "1400px" }}>
          <table className="table-app table-hover table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date / Time</th>
                <th>Venue</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{new Date(event.datetime).toLocaleString()}</td>
                  <td>{event.venue}</td>
                  <td>{event.type}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn btn-sm btn-table-edit"
                        onClick={() => handleEdit(event)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-table-delete"
                        onClick={() => handleDelete(event.id)}
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

            <h3>{editId ? "Edit Event" : "Add Event"}</h3>

            <form onSubmit={handleSubmit}>
              <input
                placeholder="Event name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
              />

              <input
                placeholder="Venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />

              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select event type</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <input
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <div className="modal-actions">
                <button type="submit">
                  {editId ? "Update Event" : "Add Event"}
                </button>
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
