import useStore from "../../../zustand/store";
import { useEffect } from "react";

// Plain number with commas
export const numberFormatter = new Intl.NumberFormat("en-US");

export default function DonationWeeklyReport({ filters }) {
  const donationWeeklyReports = useStore(
    (state) => state.donationWeeklyReports
  );
  const fetchWeeklyDonationReports = useStore(
    (state) => state.fetchWeeklyDonationReports
  );
  const loadingDonationReports = useStore(
    (state) => state.loadingDonationReports
  );

  useEffect(() => {
    fetchWeeklyDonationReports();
  }, [fetchWeeklyDonationReports]);

  if (loadingDonationReports) return <p>Loading weekly reports...</p>;

  // Filter by Year if selected
  const filteredReports = donationWeeklyReports.filter((r) => {
    if (filters.year) {
      const reportYear = new Date(r.week_start).getFullYear();
      return reportYear === Number(filters.year);
    }
    return true;
  });

  return (
    <div className="table-container">
      <table className="table-app table-hover table-striped donation-weekly-table">
        <thead>
          <tr>
            <th>Week</th>
            <th className="col-number">Total Donations</th>
            <th className="col-number">Donation Count</th>
            <th className="col-number">Restricted Amount</th>
            <th className="col-number">Notable Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((r) => (
            <tr key={r.week_start}>
              <td>{r.week_range}</td>
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
