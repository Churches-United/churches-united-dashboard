import { useState } from "react";
import "../Donors/Donors.css";

const EVENT_TYPES = [
  "Fundraiser",
  "Community Events",
  "Large Volunteer Event",
  "Other",
];

export default function EventForm({ initialData, onSubmit, onCancel }) {
  const [name, setName] = useState(initialData?.name || "");
  const [datetime, setDatetime] = useState(
    initialData?.datetime?.slice(0, 16) || ""
  );
  const [venue, setVenue] = useState(initialData?.venue || "");
  const [type, setType] = useState(initialData?.type || "");
  const [notes, setNotes] = useState(initialData?.notes || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !datetime || !venue || !type) {
      alert("Name, date/time, venue, and type are required");
      return;
    }

    onSubmit({ name, datetime, venue, type, notes });
  };

  return (
    // todo style form
    <div className="form-container development">
      <form onSubmit={handleSubmit} className="grid-form">
        {/* Row 1: 2 columns */}
        <label>
          Event Name
          <input
            placeholder="Event name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Date & Time
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </label>

        {/* Row 2: 2 columns */}
        <label>
          Venue
          <input
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </label>

        <label>
          Event Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select event type</option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        {/* Row 3: full-width */}
        <label className="full-width">
          Notes
          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>

        {/* Row 4: buttons */}
        <div className="form-actions full-width">
          <button type="submit" className="primary">
            {initialData ? "Update Event" : "Add Event"}
          </button>
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
