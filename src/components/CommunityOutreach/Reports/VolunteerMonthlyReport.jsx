import { useEffect } from "react";
import useStore from "../../../zustand/store";

export default function VolunteerMonthlyReport() {
  const fetchVolunteerMonthlyReports = useStore(
    (state) => state.fetchVolunteerMonthlyReports
  );
  const reports = useStore((state) => state.volunteerMonthlyReports);
  const loading = useStore((state) => state.loadingVolunteerReports);
  const error = useStore((state) => state.errorVolunteerReports);

  useEffect(() => {
    fetchVolunteerMonthlyReports();
  }, [fetchVolunteerMonthlyReports]);

  if (loading) return <p>Loading monthly volunteer reports...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!reports || reports.length === 0) {
    return <p>No monthly volunteer data available.</p>;
  }

  return (
    <div>
      <h2>Monthly Community Outreach Report</h2>

      <div className="table-container" style={{ maxWidth: "1000px" }}>
        <table className="table-app table-hover table-striped">
          {" "}
          <thead>
            <tr>
              <th>Month</th>
              <th>Total Volunteers</th>
              <th>Software Signups</th>
              <th>Unique Volunteers</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((row) => (
              <tr key={row.month_start}>
                <td>{row.month_label}</td>
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
