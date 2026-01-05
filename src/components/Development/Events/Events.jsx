import { useEffect, useState } from "react";
import useStore from "../../../zustand/store";

const EVENT_TYPES = [
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

  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [venue, setVenue] = useState("");
  const [type, setType] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !datetime || !venue || !type) {
      alert("Name, date/time, venue, and type are required");
      return;
    }

    if (editId) {
      await editEvent(editId, {
        name,
        datetime,
        venue,
        type,
        notes,
      });
      setEditId(null);
    } else {
      await addEvent({
        name,
        datetime,
        venue,
        type,
        notes,
      });
    }

    // reset form
    setName("");
    setDatetime("");
    setVenue("");
    setType("");
    setNotes("");
  };

  const handleEdit = (event) => {
    setEditId(event.id);
    setName(event.name);
    setDatetime(event.datetime.slice(0, 16));
    setVenue(event.venue);
    setType(event.type);
    setNotes(event.notes || "");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    await deleteEvent(id);
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Events</h2>

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

        <button type="submit">{editId ? "Update Event" : "Add Event"}</button>

        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
              setName("");
              setDatetime("");
              setVenue("");
              setType("");
              setNotes("");
            }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      <h3>All Events</h3>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <table className="table">
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
                  <button onClick={() => handleEdit(event)}>Edit</button>
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
