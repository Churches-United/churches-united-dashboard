import { useEffect } from "react";
import useStore from "../../../zustand/store";

// Optional number formatter for counts
export const numberFormatter = new Intl.NumberFormat("en-US");

export default function EventsByVenueReport({ filters }) {
  const eventsByVenue = useStore((state) => state.eventsByVenue);
  const fetchEventsByVenue = useStore((state) => state.fetchEventsByVenue);
  const loadingEventsReports = useStore((state) => state.loadingEventsReports);

  useEffect(() => {
    fetchEventsByVenue();
  }, [fetchEventsByVenue]);

  if (loadingEventsReports) return <p>Loading events by venue...</p>;

  // ---------------- Filter events by toolbar filters ----------------
  const filteredVenues = eventsByVenue.filter((v) => {
    let keep = true;

    // Filter by Year
    if (filters.year) {
      keep = keep && v.year === Number(filters.year);
    }

    // Filter by Name (optional, could be venue name)
    if (filters.name) {
      keep = keep && v.venue === filters.name;
    }

    // Filter by search input (case-insensitive)
    if (filters.search) {
      const search = filters.search.toLowerCase();
      keep = keep && v.venue.toLowerCase().includes(search);
    }

    return keep;
  });

  return (
    <div className="table-container">
      <table className="table-app table-hover table-striped events-by-venue-table">
        <thead>
          <tr>
            <th>Venue</th>
            <th>Number of Events</th>
          </tr>
        </thead>
        <tbody>
          {filteredVenues.map((v) => (
            <tr key={v.venue}>
              <td>{v.venue}</td>
              <td className="col-number">
                {numberFormatter.format(v.event_count)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
