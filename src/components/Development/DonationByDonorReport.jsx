import useStore from "../../zustand/store";
import { useEffect } from "react";

export default function DonationByDonorReport() {
  const byDonorReports = useStore((state) => state.byDonorReports);
  const fetchByDonorReports = useStore((state) => state.fetchByDonorReports);
  const loadingReports = useStore((state) => state.loadingReports);

  useEffect(() => {
    fetchByDonorReports();
  }, []);

  if (loadingReports) return <p>Loading donor reports...</p>;

  return (
    <table className="table">
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
        {byDonorReports.map((r) => (
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
  );
}
