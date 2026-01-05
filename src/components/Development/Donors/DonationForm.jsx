import { useState, useEffect } from "react";

export default function DonationForm({ donors, onSubmit, initialData }) {
  const [donorId, setDonorId] = useState(initialData?.donor_id || "");
  const [date, setDate] = useState(initialData?.date?.slice(0, 10) || "");
  const [amount, setAmount] = useState(initialData?.amount || "");
  const [notable, setNotable] = useState(initialData?.notable || false);
  const [restricted, setRestricted] = useState(initialData?.restricted || false);
  const [notes, setNotes] = useState(initialData?.notes || "");

  useEffect(() => {
    if (initialData) {
      setDonorId(initialData.donor_id);
      setDate(initialData.date?.slice(0, 10) || "");
      setAmount(initialData.amount);
      setNotable(initialData.notable);
      setRestricted(initialData.restricted);
      setNotes(initialData.notes || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ donor_id: donorId, date, amount, notable, restricted, notes });
    // reset form
    setDonorId("");
    setDate("");
    setAmount("");
    setNotable(false);
    setRestricted(false);
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={donorId} onChange={(e) => setDonorId(e.target.value)}>
        <option value="">Select donor</option>
        {donors.map((d) => (
          <option key={d.id} value={d.id}>{d.name}</option>
        ))}
      </select>

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <input type="number" step="0.01" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

      <label>
        <input type="checkbox" checked={notable} onChange={(e) => setNotable(e.target.checked)} /> Notable
      </label>
      <label>
        <input type="checkbox" checked={restricted} onChange={(e) => setRestricted(e.target.checked)} /> Restricted
      </label>

      <input placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button type="submit">{initialData ? "Update" : "Add"} Donation</button>
    </form>
  );
}
