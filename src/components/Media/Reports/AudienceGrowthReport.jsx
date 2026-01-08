import { useEffect } from "react";
import useStore from "../../../zustand/store";

export default function AudienceGrowthReport() {
  const audienceGrowthReport = useStore((state) => state.audienceGrowthReport);
  const fetchAudienceGrowthReport = useStore((state) => state.fetchAudienceGrowthReport);
  const loadingMediaReports = useStore((state) => state.loadingMediaReports);

  useEffect(() => {
    fetchAudienceGrowthReport();
  }, [fetchAudienceGrowthReport]);

  if (loadingMediaReports) return <p>Loading audience growth...</p>;

  return (
    <>
      <h3>Audience Growth</h3>
      <div className="table-container" style={{ maxWidth: "100%" }}>
        <table className="table-app table-hover table-striped">
          <thead>
            <tr>
              <th>Month</th>
              <th>Platform</th>
              <th>Audience End</th>
              <th>Growth</th>
            </tr>
          </thead>
          <tbody>
            {audienceGrowthReport.map((r, i) => (
              <tr key={`${r.platform}-${i}`}>
                <td>{r.month_date.slice(0, 7)}</td>
                <td>{r.platform}</td>
                <td>{r.audience_end}</td>
                <td>{r.audience_gain ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
