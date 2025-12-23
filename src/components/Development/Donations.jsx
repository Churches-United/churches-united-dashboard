import { useEffect } from "react";
import useStore from "../../zustand/store";

export default function DonationsPage() {
  const fetchDonations = useStore((state) => state.fetchDonations);
  const donations = useStore((state) => state.donations);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  if (loading) return <p>Loading donations...</p>;
  if (error) return <p>Error: {error}</p>;
// todo - wire up form, decide if we do tables and form as components. then move on to reports
  return (
    <div>
      <h2>Donations</h2>
      <h3>Add Donation</h3>
      <form>
        <input></input>
        <button>Submit</button>
      </form>
      <h3>All Donations</h3>

      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Donor</th>
              <th>Amount</th>
              <th>Notable</th>
              <th>Restricted</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td>{formatDate(donation.date)}</td>
                <td>{donation.donor_name}</td>
                <td>${Number(donation.amount).toFixed(2)}</td>
                <td>{donation.notable ? "Yes" : "No"}</td>
                <td>{donation.restricted ? "Yes" : "No"}</td>
                <td>{donation.notes || "—"}</td>
                <td>
                    {/* todo */}
                  <button onClick={() => handleEdit(donor)}>Edit</button>
                  <button onClick={() => handleDelete(donor.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
