import useStore from "../../zustand/store";
import { useEffect } from "react";

export default function DonationMonthlyReport() {
  const monthlyReports = useStore((state) => state.monthlyReports);
  const fetchMonthlyDonationReports = useStore((state) => state.fetchMonthlyDonationReports);
  const loadingReports = useStore((state) => state.loadingReports);

  useEffect(() => {
    fetchMonthlyDonationReports();
  }, []);

  if (loadingReports) return <p>Loading monthly reports...</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Monthly</th>
          <th>Total Donations</th>
          <th>Donation Count</th>
          <th>Restricted Amount</th>
          <th>Notable Amount</th>
        </tr>
      </thead>
      <tbody>
        {monthlyReports.map((r) => (
          <tr key={r.month_start}>
            <td>{r.month_label}</td>
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
