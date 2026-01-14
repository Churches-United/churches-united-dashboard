import { useState, useEffect } from "react";
import "./Donors.css";

export default function DonationForm({
  donors,
  initialData,
  onSubmit,
  onCancel,
}) {
  const [donorId, setDonorId] = useState(initialData?.donor_id || "");
  const [date, setDate] = useState(initialData?.date?.slice(0, 10) || "");
  const [amount, setAmount] = useState(initialData?.amount || "");
  const [notable, setNotable] = useState(initialData?.notable || false);
  const [restricted, setRestricted] = useState(
    initialData?.restricted || false
  );
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
    // style form
    <div className="form-container development">
      <form onSubmit={handleSubmit} className="donation-form-grid">
        <label>
          Donor
          <select value={donorId} onChange={(e) => setDonorId(e.target.value)}>
            <option value="">Select donor</option>
            {donors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          Amount
          <input
            type="number"
            step="0.01"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>

        <div className="checkbox-group">
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
        </div>

        <label className="full-width">
          Notes
          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </label>

        <div className="form-actions full-width">
          <button type="submit" className="primary">
            {initialData ? "Update" : "Add"} Donation
          </button>
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
