import { useEffect } from "react";
import useStore from "../../../zustand/store";

export default function EventsByVenueReport() {
  const eventsByVenue = useStore((state) => state.eventsByVenue);
  const fetchEventsByVenue = useStore((state) => state.fetchEventsByVenue);
  const loadingEventsReports = useStore((state) => state.loadingEventsReports);

  useEffect(() => {
    fetchEventsByVenue();
  }, []);

  if (loadingEventsReports) return <p>Loading events by venue...</p>;

  return (
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
}
