import { useEffect } from "react";
import useStore from "../../../zustand/store";

export default function VolunteerWeeklyReport() {
  const fetchVolunteerWeeklyReports = useStore((state) => state.fetchVolunteerWeeklyReports);
  const reports = useStore((state) => state.volunteerWeeklyReports);
  const loading = useStore((state) => state.loadingVolunteerReports);
  const error = useStore((state) => state.errorVolunteerReports);
  
  useEffect(() => {
    fetchVolunteerWeeklyReports();
  }, [fetchVolunteerWeeklyReports]);

  if (loading) return <p>Loading weekly volunteer reports...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (reports.length === 0) {
    return <p>No weekly volunteer data available.</p>;
  }

  return (
    <div>
      <h2>Weekly Community Outreach Report</h2>

    <div className="table-container" style={{ maxWidth: "1000px" }}>
      <table className="table-app table-hover table-striped">
                <thead>
          <tr>
            <th>Week</th>
            <th>Total Volunteers</th>
            <th>Software Signups</th>
            <th>Unique Volunteers</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((row) => (
            <tr key={row.week_start}>
              <td>{row.week_range}</td>
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
