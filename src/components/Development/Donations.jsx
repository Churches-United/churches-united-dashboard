import { useEffect, useState } from "react";
import useStore from "../../zustand/store";

export default function DonationsPage() {
  const fetchDonations = useStore((state) => state.fetchDonations);
  const deleteDonation = useStore((state) => state.deleteDonation);
  const editDonation = useStore((state) => state.editDonation);
  const donations = useStore((state) => state.donations);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);

  const donors = useStore((state) => state.donors);
  const fetchDonors = useStore((state) => state.fetchDonors);
  const addDonation = useStore((state) => state.addDonation);

  const [donorId, setDonorId] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [notable, setNotable] = useState(false);
  const [restricted, setRestricted] = useState(false);
  const [notes, setNotes] = useState("");
  const [editId, setEditId] = useState("");

  useEffect(() => {
    fetchDonations();
    fetchDonors();
  }, [fetchDonations, fetchDonors]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US");

  const handleAddDonation = async (e) => {
    e.preventDefault();

    const payload = {
      donor_id: donorId,
      date,
      amount,
      notable,
      restricted,
      notes,
    };

    if (editId) {
      await editDonation(editId, payload);
      setEditId(null);
    } else {
      await addDonation(payload);
    }

    setDonorId("");
    setDate("");
    setAmount("");
    setNotable(false);
    setRestricted(false);
    setNotes("");
  };

  const handleEdit = (donation) => {
    setEditId(donation.id);
    setDonorId(donation.donor_id);
    setDate(donation.date.slice(0, 10));
    setAmount(donation.amount);
    setNotable(donation.notable);
    setRestricted(donation.restricted);
    setNotes(donation.notes || "");
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this donation? This cannot be undone."
      )
    ) {
      await deleteDonation(id);
    }
  };

  if (loading) return <p>Loading donations...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Donations</h2>

      <h3>Add Donation</h3>
      <form onSubmit={handleAddDonation}>
        <select value={donorId} onChange={(e) => setDonorId(e.target.value)}>
          <option value="">Select donor</option>
          {donors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>
          <input
            type="checkbox"
            checked={notable}
            onChange={(e) => setNotable(e.target.checked)}
          />
          Notable
        </label>

        <label>
          <input
            type="checkbox"
            checked={restricted}
            onChange={(e) => setRestricted(e.target.checked)}
          />
          Restricted
        </label>

        <input
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">Add Donation</button>
      </form>

      <h3>All Donations</h3>

      {donations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        <table className="table">
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
                  <button onClick={() => handleEdit(donation)}>Edit</button>
                  <button onClick={() => handleDelete(donation.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
