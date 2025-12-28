import { useEffect, useState } from "react";
import useStore from "../../zustand/store";

export default function EventsReporting() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const upcomingEvents = useStore((state) => state.upcomingEvents);
  const eventsByVenue = useStore((state) => state.eventsByVenue);
  const loadingEventsReports = useStore((state) => state.loadingEventsReports);
  const fetchUpcomingEvents = useStore((state) => state.fetchUpcomingEvents);
  const fetchEventsByVenue = useStore((state) => state.fetchEventsByVenue);

  useEffect(() => {
    if (activeTab === "upcoming") fetchUpcomingEvents();
    if (activeTab === "venue") fetchEventsByVenue();
  }, [activeTab]);

  if (loadingEventsReports) return <p>Loading events report...</p>;

  const renderUpcoming = () => (
    <table className="table">
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Date & Time</th>
          <th>Venue</th>
          <th>Type</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {upcomingEvents.map((e) => (
          <tr key={e.id}>
            <td>{e.name}</td>
            <td>{new Date(e.datetime).toLocaleString()}</td>
            <td>{e.venue}</td>
            <td>{e.type}</td>
            <td>{e.notes || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderByVenue = () => (
    <table className="table table--compact">
      <thead>
        <tr>
          <th>Venue</th>
          <th>Number of Events</th>
        </tr>
      </thead>
      <tbody>
        {eventsByVenue.map((v) => (
          <tr key={v.venue}>
            <td>{v.venue}</td>
            <td>{v.event_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h2>Events Reports</h2>
      <div>
        <button onClick={() => setActiveTab("upcoming")}>
          Upcoming Events
        </button>
        <button onClick={() => setActiveTab("venue")}>By Venue</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        {activeTab === "upcoming" && renderUpcoming()}
        {activeTab === "venue" && renderByVenue()}
      </div>
    </div>
  );
}
