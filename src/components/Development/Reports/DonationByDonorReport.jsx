import useStore from "../../../zustand/store";
import { useEffect } from "react";

export default function DonationByDonorReport() {
  const donationByDonorReports = useStore(
    (state) => state.donationByDonorReports
  );
  const fetchByDonorReports = useStore((state) => state.fetchByDonorReports);
  const loadingDonationReports = useStore(
    (state) => state.loadingDonationReports
  );

  useEffect(() => {
    fetchByDonorReports();
  }, []);

  if (loadingDonationReports) return <p>Loading donor reports...</p>;

  return (
    <div className="table-container" style={{ maxWidth: "1200px" }}>
      <table className="table-app table-hover table-striped">
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
          {donationByDonorReports.map((r) => (
            <tr key={r.donor_id}>
              <td>{r.donor_name}</td>
              <td>{r.donor_type}</td>
              <td>${r.total_donated}</td>
              <td>{r.donation_count}</td>
              <td>${r.restricted_total}</td>
              <td>${r.notable_total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
