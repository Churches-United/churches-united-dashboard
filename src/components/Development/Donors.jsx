import { useEffect, useState } from "react";
import useStore from "../../zustand/store";

export default function DonorsPage() {
  const fetchDonors = useStore((state) => state.fetchDonors);
  const addDonor = useStore((state) => state.addDonor);
  const updateDonor = useStore((state) => state.updateDonor);
  const deleteDonor = useStore((state) => state.deleteDonor);

  const donors = useStore((state) => state.donors);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);

  const [name, setName] = useState("");
  const [type, setType] = useState("Individual"); 
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  if (loading) return <p>Loading donors...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateDonor(editingId, { name, type });
      setEditingId(null);
    } else {
      await addDonor({ name, type });
    }
    setName("");
    setType("Individual");
  };

  const handleEdit = (donor) => {
    setEditingId(donor.id);
    setName(donor.name);
    setType(donor.type);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      await deleteDonor(id);
    }
  };

  return (
    <div>
      <h2>Donors</h2>

      <h3>{editingId ? "Edit Donor" : "Add Donor"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Individual">Individual</option>
          <option value="Organization">Organization</option>
          <option value="Corporate">Corporate</option>
        </select>
        <button type="submit">{editingId ? "Update" : "Add"}</button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setName("");
              setType("Individual");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h3>Donor List</h3>
      {donors.length === 0 ? (
        <p>No donors found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id}>
                <td>{donor.name}</td>
                <td>{donor.type}</td>
                <td>
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
