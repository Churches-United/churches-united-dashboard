import { useState, useEffect } from "react";
import useStore from "../../../zustand/store";

export default function DonorsPage() {
  const fetchDonors = useStore((state) => state.fetchDonors);
  const addDonor = useStore((state) => state.addDonor);
  const deleteDonor = useStore((state) => state.deleteDonor);
  const editDonor = useStore((state) => state.editDonor);
  const donors = useStore((state) => state.donors);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);

  const [name, setName] = useState("");
  const [type, setType] = useState("Individual");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  const handleAddDonor = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;
    // prevent duplicates
    const nameExists = donors.some(
      (d) => d.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (nameExists) {
      alert("A donor with this name already exists.");
      return;
    }

    await addDonor(name, type);
    setName("");
    setType("Individual");
  };

  const handleEdit = (donor) => {
    setEditId(donor.id);
    setName(donor.name);
    setType(donor.type);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this donor? All history will be lost."
      )
    ) {
      await deleteDonor(id);
    }
  };

  if (loading) return <p>Loading donors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Donors</h2>
      <h3>{editId ? "Edit Donor" : "Add Donor"}</h3>
      <form onSubmit={handleAddDonor}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Individual">Individual</option>
          <option value="Organization">Organization</option>
          <option value="Corporate">Corporate</option>
        </select>
        <button type="submit">{editId ? "Update" : "Add"} Donor</button>
        {editId && (
          <button
            type="button"
            onClick={() => {
              setEditId(null);
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
        <div className="table-container" style={{ maxWidth: "800px" }}>
          <table className="table-app table-hover table-striped">
            {" "}
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
                    <div className="table-actions">
                      <button
                        className="btn btn-sm btn-table-edit"
                        onClick={() => handleEdit(donor)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-table-delete"
                        onClick={() => handleDelete(donor.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
