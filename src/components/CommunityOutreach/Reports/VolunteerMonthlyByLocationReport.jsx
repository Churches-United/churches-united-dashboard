import { useEffect } from "react";
import useStore from "../../../zustand/store";

export default function VolunteerMonthlyByLocationReport() {
  const fetchReports = useStore(
    (state) => state.fetchVolunteerMonthlyByLocationReports
  );
  const reports = useStore(
    (state) => state.volunteerMonthlyByLocationReports
  );
  const loading = useStore((state) => state.loadingVolunteerReports);
  const error = useStore((state) => state.errorVolunteerReports);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  if (loading) return <p>Loading monthly volunteer reports...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!reports || reports.length === 0)
    return <p>No monthly volunteer data available.</p>;

  return (
    <div>
      <h2>Monthly Volunteer Report by Location</h2>
      <table className="table">
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
          {reports.map((row) => (
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
  );
}
