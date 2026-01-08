import { useEffect, useState } from "react";
import useStore from "../../../zustand/store";
import TableToolBar from "../../DesignComponents/TableToolBar/TableToolBar";


export default function MonthlyMediaReport() {
  const { monthlyReport, fetchMonthlyMediaReport, loadingMediaReports } =
    useStore();

  const [platform, setPlatform] = useState("");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");

  // get available years from data
  const years = Array.from(
    new Set(monthlyReport.map((r) => r.month_date.slice(0, 4)))
  ).sort((a, b) => b - a);

  const filteredRecords = monthlyReport
    .filter((r) => !platform || r.platform === platform)
    .filter((r) => !year || r.month_date.startsWith(year))
    .filter(
      (r) => !search || r.platform.toLowerCase().includes(search.toLowerCase())
    );

  useEffect(() => {
    fetchMonthlyMediaReport();
  }, [fetchMonthlyMediaReport]);

  if (loadingMediaReports) return <p>Loading monthly report...</p>;

  return (
    <div className="monthly-report-page">

      <div
        className="table-container table-contained"
        style={{ maxWidth: "1000px" }}
        >
        <h3>Monthly Media Report</h3>
        <TableToolBar
          filters={{
            year: {
              label: "Year",
              options: years,
              value: year,
              onChange: setYear,
            },
            platform: {
              label: "Platform",
              options: [
                "Website",
                "Facebook",
                "Instagram",
                "TikTok",
                "Newsletter",
              ],
              value: platform,
              onChange: setPlatform,
            },
          }}
          search={{ value: search, onChange: setSearch }}
          style={{ maxWidth: "900px" }}
        />
        <table className="table-app table-hover table-striped">
          <thead>
            <tr>
              <th>Month</th>
              <th>Platform</th>
              <th>Total Visits</th>
              <th>Unique Visits</th>
              <th>Pageviews</th>
              <th>Social Views</th>
              <th>Avg Bounce</th>
              <th>Audience Gain</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length === 0 ? (
              <tr>
                <td colSpan="8" className="table-empty">
                  No records found.
                </td>
              </tr>
            ) : (
              filteredRecords.map((r) => (
                <tr key={`${r.platform}-${r.month_date}`}>
                  <td>{r.month_date.slice(0, 7)}</td>
                  <td>{r.platform}</td>
                  <td>{r.total_visits}</td>
                  <td>{r.unique_visits}</td>
                  <td>{r.pageviews}</td>
                  <td>{r.social_views}</td>
                  <td>{r.avg_bounce_rate ?? ""}</td>
                  <td>{r.audience_gain ?? ""}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
