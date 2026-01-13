import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../../zustand/store";
import { FaEdit, FaTrash } from "react-icons/fa";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";
import EventForm from "./EventForm";
import EventList from "./EventList";

import "../../../styles/modal.css";
import "../Donors/Donors.css";

export const EVENT_TYPES = [
  "Fundraiser",
  "Community Events",
  "Large Volunteer Event",
  "Other",
];

export default function EventsPage() {
  const fetchEvents = useStore((state) => state.fetchEvents);
  const addEvent = useStore((state) => state.addEvent);
  const editEvent = useStore((state) => state.editEvent);
  const deleteEvent = useStore((state) => state.deleteEvent);

  const events = useStore((state) => state.events);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);

  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleAddClick = () => {
    setEditingEvent(null);
    setShowModal(true);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    await deleteEvent(id);
    await fetchEvents();
  };

  const handleSubmit = async (data) => {
    if (editingEvent) {
      await editEvent(editingEvent.id, data);
    } else {
      await addEvent(data);
    }
    setShowModal(false);
    await fetchEvents(); // refresh table after add/edit
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
        <button onClick={handleAddClick}>Add Event</button>
      </div>

      {/* Table */}
      <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} />

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

            <h3>{editingEvent ? "Edit Event" : "Add Event"}</h3>

            <EventForm
              initialData={editingEvent}
              onSubmit={handleSubmit}
              onCancel={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
