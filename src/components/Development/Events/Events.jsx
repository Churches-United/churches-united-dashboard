import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useStore from "../../../zustand/store";
import DepartmentHeader from "../../DesignComponents/DepartmentHeader";
import EventForm from "./EventForm";
import EventList from "./EventList";
import "../../../styles/modal.css";
import "../Donors/Donors.css";

export default function EventsPage() {
  const fetchEvents = useStore((s) => s.fetchEvents);
  const addEvent = useStore((s) => s.addEvent);
  const editEvent = useStore((s) => s.editEvent);
  const deleteEvent = useStore((s) => s.deleteEvent);
  const events = useStore((s) => s.events);
  const loading = useStore((s) => s.loading);
  const error = useStore((s) => s.error);

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

  const handleSubmit = async (data) => {
    if (editingEvent) {
      await editEvent(editingEvent.id, data);
    } else {
      await addEvent(data);
    }
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(id);
    }
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="hub-container events">
      <DepartmentHeader
        title="Events"
        actions={
          <>
            <NavLink to="/development" end className={({ isActive }) => isActive ? "active" : ""}>
              Home
            </NavLink>
            <NavLink to="/development/reports" className={({ isActive }) => isActive ? "active" : ""}>
              Reports
            </NavLink>
          </>
        }
      />

      <div className="toolbar-actions-top">
        <button onClick={handleAddClick}>Add Event</button>
      </div>

      <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} />

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowModal(false)}>
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
