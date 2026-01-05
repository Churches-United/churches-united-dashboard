import { useEffect } from "react";
import useStore from "../../../zustand/store";

export default function UpcomingEventsReport() {
  const upcomingEvents = useStore((state) => state.upcomingEvents);
  const fetchUpcomingEvents = useStore((state) => state.fetchUpcomingEvents);
  const loadingEventsReports = useStore((state) => state.loadingEventsReports);
  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  if (loadingEventsReports) return <p>Loading upcoming events...</p>;

  return (
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
}
