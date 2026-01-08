import { useEffect } from "react";
import useStore from "../../../zustand/store";

export default function NewsletterReport() {
  const newsletterReport = useStore((state) => state.newsletterReport);
  const fetchNewsletterReport = useStore((state) => state.fetchNewsletterReport);
  const loadingMediaReports = useStore((state) => state.loadingMediaReports);

  useEffect(() => {
    fetchNewsletterReport();
  }, [fetchNewsletterReport]);

  if (loadingMediaReports) return <p>Loading newsletter report...</p>;

  return (
    <>
      <h3>Newsletter Performance</h3>
      <div className="table-container" style={{ maxWidth: "100%" }}>
        <table className="table-app table-hover table-striped">
          <thead>
            <tr>
              <th>Month</th>
              <th>Sent</th>
              <th>Opens</th>
              <th>Open Rate</th>
              <th>Clicks</th>
              <th>Click Rate</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {newsletterReport.map((r) => (
              <tr key={r.month_date}>
                <td>{r.month_date.slice(0, 7)}</td>
                <td>{r.total_sent}</td>
                <td>{r.total_opens}</td>
                <td>{r.open_rate}%</td>
                <td>{r.total_clicks}</td>
                <td>{r.click_rate}%</td>
                <td>{r.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
