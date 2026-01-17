import useStore from "../../../zustand/store";
import { useEffect } from "react";

// Plain number with commas
export const numberFormatter = new Intl.NumberFormat("en-US");

export default function DonationMonthlyReport({ filters }) {
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
  }, [fetchMonthlyDonationReports]);

  if (loadingDonationReports) return <p>Loading monthly reports...</p>;

  // Filter by Year if selected
  const filteredReports = donationMonthlyReports.filter((r) => {
    if (filters.year) {
      const reportYear = new Date(r.month_start).getFullYear();
      return reportYear === Number(filters.year);
    }
    return true;
  });

  return (
    <div className="table-container">
      <table className="table-app table-hover table-striped donation-monthly-table">
        <thead>
          <tr>
            <th>Month</th>
            <th className="col-number">Total Donations</th>
            <th className="col-number">Donation Count</th>
            <th className="col-number">Restricted Amount</th>
            <th className="col-number">Notable Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((r) => (
            <tr key={r.month_start}>
              <td>{r.month_label}</td>
              <td className="col-number">
                ${numberFormatter.format(r.total_amount)}
              </td>
              <td className="col-number">
                {numberFormatter.format(r.donation_count)}
              </td>
              <td className="col-number">
                ${numberFormatter.format(r.restricted_amount)}
              </td>
              <td className="col-number">
                ${numberFormatter.format(r.notable_amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
