import useStore from "../../../zustand/store";
import { useEffect } from "react";

export default function DonationMonthlyReport() {
  const donationMonthlyReports = useStore(
    (state) => state.donationMonthlyReports
  );
  const fetchMonthlyDonationReports = useStore(
    (state) => state.fetchMonthlyDonationReports
  );
  const loadingDonationReports = useStore(
    (state) => state.loadingDonationReports
  );

  useEffect(() => {
    fetchMonthlyDonationReports();
  }, []);

  if (loadingDonationReports) return <p>Loading monthly reports...</p>;

  return (
    <div className="table-container" style={{ maxWidth: "1400px" }}>
      <table className="table-app table-hover table-striped">
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
          {donationMonthlyReports.map((r) => (
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
    </div>
  );
}
