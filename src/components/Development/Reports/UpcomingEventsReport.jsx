import { useEffect } from "react";
import useStore from "../../../zustand/store";

// Optional number formatter (future numeric columns)
export const numberFormatter = new Intl.NumberFormat("en-US");

export default function UpcomingEventsReport({ filters }) {
  const upcomingEvents = useStore((state) => state.upcomingEvents);
  const fetchUpcomingEvents = useStore((state) => state.fetchUpcomingEvents);
  const loadingEventsReports = useStore((state) => state.loadingEventsReports);

  useEffect(() => {
    fetchUpcomingEvents();
  }, [fetchUpcomingEvents]);

  if (loadingEventsReports) return <p>Loading upcoming events...</p>;

  // ---------------- Filter events ----------------
  const filteredEvents = upcomingEvents.filter((e) => {
    let keep = true;

    // Filter by year
    if (filters.year) {
      const eventYear = new Date(e.datetime).getFullYear();
      keep = keep && eventYear === Number(filters.year);
    }

    // Filter by name
    if (filters.name) {
      keep = keep && e.name === filters.name;
    }

    // Filter by search input (case-insensitive)
    if (filters.search) {
      const search = filters.search.toLowerCase();
      keep =
        keep &&
        (e.name.toLowerCase().includes(search) ||
          (e.venue?.toLowerCase() || "").includes(search));
    }

    return keep;
  });

  return (
    <div className="table-container">
      <table className="table-app table-hover table-striped upcoming-events-table">
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
          {filteredEvents.map((e) => (
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
    </div>
  );
}
