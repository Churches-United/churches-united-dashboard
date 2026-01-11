import { useState, useEffect } from "react";
import useStore from "../../../zustand/store";

export default function VolunteerEngagementForm({ editId, setEditId }) {
  const fetchVolunteers = useStore((state) => state.fetchVolunteers);
  const volunteers = useStore((state) => state.volunteers);

  const addEngagement = useStore((state) => state.addEngagement);
  const editEngagement = useStore((state) => state.editEngagement);
  const engagements = useStore((state) => state.engagements);

  const loadingVolunteers = useStore((state) => state.loadingVolunteers);
  const errorVolunteers = useStore((state) => state.errorVolunteers);
  const loadingEngagements = useStore((state) => state.loadingEngagements);
  const errorEngagements = useStore((state) => state.errorEngagements);

  const [volunteerId, setVolunteerId] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [numberVolunteers, setNumberVolunteers] = useState(1);
  const [softwareSignups, setSoftwareSignups] = useState(0);

  const LOCATIONS = [
    "Bright Sky",
    "Community Picnic",
    "Dorothy Day Food Pantry",
    "Kitchen",
    "Micah's Mission Basement",
    "Micah's Mission Pantry",
    "Silver Linings",
    "Other",
  ];

  useEffect(() => {
    fetchVolunteers();
  }, [fetchVolunteers]);

  useEffect(() => {
    if (editId) {
      const engagement = engagements.find((e) => e.id === editId);
      if (engagement) {
        setVolunteerId(engagement.volunteer_id);
        setEventDate(
          new Date(engagement.event_date).toISOString().slice(0, 10)
        );
        setLocation(engagement.location);
        setNumberVolunteers(engagement.number_volunteers);
        setSoftwareSignups(engagement.software_signups || 0);
      }
    } else {
      setVolunteerId("");
      setEventDate("");
      setLocation("");
      setNumberVolunteers(1);
      setSoftwareSignups(0);
    }
  }, [editId, engagements]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      volunteer_id: volunteerId,
      event_date: eventDate,
      location,
      number_volunteers: parseInt(numberVolunteers, 10),
      software_signups: parseInt(softwareSignups, 10) || 0,
    };

    if (editId) {
      await editEngagement(editId, payload);
      setEditId(null);
    } else {
      await addEngagement(payload);
    }

    setVolunteerId("");
    setEventDate("");
    setLocation("");
    setNumberVolunteers(1);
    setSoftwareSignups(0);
  };

  if (loadingVolunteers)
    return <p className="table-loading">Loading volunteers...</p>;
  if (errorVolunteers)
    return <p className="table-error">Error: {errorVolunteers}</p>;

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="grid-form">
        <h3>{editId ? "Edit Engagement" : "Log Volunteer Engagement"}</h3>

        <label>
          Volunteer
          <select
            value={volunteerId}
            onChange={(e) => setVolunteerId(e.target.value)}
            required
          >
            <option value="">Select Volunteer</option>
            {volunteers.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.type})
              </option>
            ))}
          </select>
        </label>

        <label>
          Event Date
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </label>

        <label>
          Location
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          >
            <option value="">Select Location</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <label>
          Number of Volunteers
          <input
            type="number"
            min="1"
            value={numberVolunteers}
            onChange={(e) => setNumberVolunteers(e.target.value)}
            required
          />
        </label>

        <label>
          Software Signups (optional)
          <input
            type="number"
            min="0"
            value={softwareSignups}
            onChange={(e) => setSoftwareSignups(e.target.value)}
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="primary">
            {editId ? "Update Engagement" : "Submit Engagement"}
          </button>
          {editId && (
            <button
              type="button"
              className="secondary"
              onClick={() => setEditId(null)}
            >
              Cancel
            </button>
          )}
        </div>

        {errorEngagements && <p className="table-error">{errorEngagements}</p>}
      </form>
    </div>
  );
}
