const EVENT_TYPES = [
  "Fundraiser",
  "Community Events",
  "Large Volunteer Event",
  "Other",
];

export default function EventForm({ initialData, onSubmit, onCancel }) {
  const [name, setName] = useState(initialData?.name || "");
  const [datetime, setDatetime] = useState(initialData?.datetime?.slice(0,16) || "");
  const [venue, setVenue] = useState(initialData?.venue || "");
  const [type, setType] = useState(initialData?.type || "");
  const [notes, setNotes] = useState(initialData?.notes || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, datetime, venue, type, notes });
  };

  return (
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
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <input
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <div className="modal-actions">
        <button type="submit">{initialData ? "Update Event" : "Add Event"}</button>
        <button type="button" className="secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
