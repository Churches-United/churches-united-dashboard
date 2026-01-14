import { useState, useEffect } from "react";

const DONOR_TYPES = ["Individual", "Organization", "Corporate"];

export default function DonorForm({ initialData, onSubmit, onCancel }) {
  const [name, setName] = useState(initialData?.name || "");
  const [type, setType] = useState(initialData?.type || "Individual");

  useEffect(() => {
    setName(initialData?.name || "");
    setType(initialData?.type || "Individual");
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name, type });
  };

  return (
    // style form
    <div className="form-container development">
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Donor Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {DONOR_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <div className="form-buttons">
          <button type="submit" className="primary">{initialData ? "Update" : "Add"} Donor</button>
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
