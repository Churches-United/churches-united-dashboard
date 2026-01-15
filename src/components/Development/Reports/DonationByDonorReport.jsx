import useStore from "../../../zustand/store";
import { useEffect } from "react";

// Plain number formatter
export const numberFormatter = new Intl.NumberFormat("en-US");

export default function DonationByDonorReport({ filters }) {
  const donationByDonorReports = useStore(
    (state) => state.donationByDonorReports
  );
  const fetchByDonorReports = useStore((state) => state.fetchByDonorReports);
  const loadingDonationReports = useStore(
    (state) => state.loadingDonationReports
  );

  useEffect(() => {
    fetchByDonorReports();
  }, [fetchByDonorReports]);

  if (loadingDonationReports) return <p>Loading donor reports...</p>;

  // Filter by Name / Year if provided
  const filteredReports = donationByDonorReports.filter((r) => {
    let keep = true;

    // Filter by name
    if (filters.name) {
      keep = keep && r.donor_name === filters.name;
    }

    // Filter by year (optional)
    if (filters.year) {
      const year = new Date(r.createdAt || r.donation_date).getFullYear();
      keep = keep && year === Number(filters.year);
    }

    // Filter by search input (case-insensitive, matches name or type)
    if (filters.search) {
      const search = filters.search.toLowerCase();
      keep =
        keep &&
        (r.donor_name.toLowerCase().includes(search) ||
          r.donor_type.toLowerCase().includes(search));
    }

    return keep;
  });
  
  return (
    <div className="table-container" style={{ maxWidth: "1200px" }}>
      <table className="table-app table-hover table-striped donation-by-donor-table">
        <thead>
          <tr>
            <th>Donor</th>
            <th>Type</th>
            <th>Total Donated</th>
            <th>Donation Count</th>
            <th>Restricted Total</th>
            <th>Notable Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((r) => (
            <tr key={r.donor_id}>
              <td>{r.donor_name}</td>
              <td>{r.donor_type}</td>
              <td className="col-number">
                ${numberFormatter.format(r.total_donated)}
              </td>
              <td className="col-number">
                {numberFormatter.format(r.donation_count)}
              </td>
              <td className="col-number">
                ${numberFormatter.format(r.restricted_total)}
              </td>
              <td className="col-number">
                ${numberFormatter.format(r.notable_total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
