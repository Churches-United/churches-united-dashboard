import { useEffect } from "react";
import useStore from "../../../zustand/store";

export default function VolunteerMonthlyByLocationReport({ year, location, search }) {
  const fetchReports = useStore(
    (state) => state.fetchVolunteerMonthlyByLocationReports
  );
  const reports = useStore((state) => state.volunteerMonthlyByLocationReports);
  const loading = useStore((state) => state.loadingVolunteerReports);
  const error = useStore((state) => state.errorVolunteerReports);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  if (loading) return <p>Loading monthly volunteer reports...</p>;
  if (error) return <p className="table-error">{error}</p>;
  if (!reports || reports.length === 0)
    return <p className="table-empty">No monthly volunteer data available.</p>;

  const filteredReports = reports.filter((row) => {
    const reportYear = new Date(row.month_start).getFullYear();
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
      <h2>Monthly Volunteer Report by Location</h2>
      <div className="table-container table-contained">
        <table className="table-app">
          <thead>
            <tr>
              <th>Month</th>
              <th>Location</th>
              <th>Total Volunteers</th>
              <th>Software Signups</th>
              <th>Unique Volunteers</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((row) => (
              <tr key={`${row.month_label}-${row.location}`}>
                <td>{row.month_label}</td>
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
