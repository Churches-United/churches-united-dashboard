import { useEffect } from "react";
import useStore from "../../../zustand/store";

export default function VolunteerByLocationReport() {
  const fetchVolunteerByLocationReports = useStore(
    (state) => state.fetchVolunteerByLocationReports
  );
  const reports = useStore((state) => state.volunteerByLocationReports);
  const loading = useStore((state) => state.loadingVolunteerReports);
  const error = useStore((state) => state.errorVolunteerReports);

  useEffect(() => {
    fetchVolunteerByLocationReports();
  }, [fetchVolunteerByLocationReports]);

  if (loading) return <p>Loading volunteer reports by location...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!reports || reports.length === 0) {
    return <p>No volunteer data by location available.</p>;
  }

  return (
    <div>
      <h2>Volunteer Engagement by Location</h2>

      <div className="table-container" style={{ maxWidth: "1000px" }}>
        <table className="table-app table-hover table-striped">
          <thead>
            <tr>
              <th>Location</th>
              <th>Total Volunteers</th>
              <th>Software Signups</th>
              <th>Unique Volunteers</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((row) => (
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
