import useStore from "../../zustand/store";
import { useEffect } from "react";

export default function DonationWeeklyReport() {
  const weeklyReports = useStore((state) => state.weeklyReports);
  const fetchWeeklyDonationReports = useStore((state) => state.fetchWeeklyDonationReports);
  const loadingReports = useStore((state) => state.loadingReports);

  useEffect(() => {
    fetchWeeklyDonationReports();
  }, []);

  if (loadingReports) return <p>Loading weekly reports...</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Week</th>
          <th>Total Donations</th>
          <th>Donation Count</th>
          <th>Restricted Amount</th>
          <th>Notable Amount</th>
        </tr>
      </thead>
      <tbody>
        {weeklyReports.map((r) => (
          <tr key={r.week_start}>
            <td>{r.week_range}</td>
            <td>${r.total_amount}</td>
            <td>{r.donation_count}</td>
            <td>${r.restricted_amount}</td>
            <td>${r.notable_amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
