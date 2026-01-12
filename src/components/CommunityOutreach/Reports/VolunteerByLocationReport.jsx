import { useEffect } from "react";
import useStore from "../../../zustand/store";

export default function VolunteerByLocationReport({ year, location, search }) {
  const fetchReports = useStore((state) => state.fetchVolunteerByLocationReports);
  const reports = useStore((state) => state.volunteerByLocationReports);
  const loading = useStore((state) => state.loadingVolunteerReports);
  const error = useStore((state) => state.errorVolunteerReports);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  if (loading) return <p>Loading volunteer reports by location...</p>;
  if (error) return <p className="table-error">{error}</p>;
  if (!reports || reports.length === 0)
    return <p className="table-empty">No volunteer data by location available.</p>;

  const filteredReports = reports.filter((row) => {
    const reportYear = row.week_start || row.month_start
      ? new Date(row.week_start || row.month_start).getFullYear()
      : null;
    const matchesYear = year ? reportYear === parseInt(year, 10) : true;
    const matchesLocation = location && location !== "All" ? row.location === location : true;
    const matchesSearch = search
      ? (row.location || "").toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesYear && matchesLocation && matchesSearch;
  });

  if (filteredReports.length === 0)
    return <p className="table-empty">No volunteer data matches your filters.</p>;

  return (
    <div className="report-section">
      <h2>Volunteer Engagement by Location</h2>
      <div className="table-container table-contained">
        <table className="table-app">
          <thead>
            <tr>
              <th>Location</th>
              <th>Total Volunteers</th>
              <th>Software Signups</th>
              <th>Unique Volunteers</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((row) => (
              <tr key={row.location}>
                <td>{row.location}</td>
                <td>{row.total_volunteers}</td>
                <td>{row.total_signups}</td>
                <td>{row.volunteer_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
