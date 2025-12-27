import { useEffect, useState } from "react";
import useStore from "../../zustand/store";

export default function KitchenPage() {
  const fetchKitchenRecords = useStore((state) => state.fetchKitchenRecords);
  const deleteKitchenRecord = useStore((state) => state.deleteKitchenRecord);
  const editKitchenRecord = useStore((state) => state.editKitchenRecord);
  const kitchenRecords = useStore((state) => state.kitchenRecords);
  const loading = useStore((state) => state.loading);
  const error = useStore((state) => state.error);
  const addKitchenRecord = useStore((state) => state.addKitchenRecord);

  const [weekDate, setWeekDate] = useState("");
  const [totalMeals, setTotalMeals] = useState("");
  const [notes, setNotes] = useState("");
  const [editId, setEditId] = useState("");


    useEffect(() => {
    fetchKitchenRecords();
  }, [fetchKitchenRecords]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US");

  // Fill form with record data for editing
const handleEdit = (record) => {
  setEditId(record.id);
  setWeekDate(record.week_date);
  setTotalMeals(record.total_meals_served);
  setNotes(record.notes || "");
};

  // Handle form submission for add and edit
const handleAddKitchenRecord = async (e) => {
  e.preventDefault();

  if (editId) {
    await editKitchenRecord(editId, parseInt(totalMeals), notes);
    setEditId(null);
  } else {
    await addKitchenRecord(weekDate, parseInt(totalMeals), notes);
  }

  // Clear form
  setWeekDate("");
  setTotalMeals("");
  setNotes("");
};

  if (loading) return <p>Loading kitchen records...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
  <div>
    <h2>Kitchen Operations</h2>

    <h3>{editId ? "Edit Kitchen Record" : "Add Kitchen Record"}</h3>

    <form onSubmit={handleAddKitchenRecord}>
      {/* Date input */}
      <input
        type="date"
        value={weekDate}
        onChange={(e) => setWeekDate(e.target.value)}
        disabled={editId}
        required
      />

      {/* Meals served */}
      <input
        type="number"
        placeholder="Total Meals Served"
        value={totalMeals}
        onChange={(e) => setTotalMeals(e.target.value)}
        min="0"
        required
      />

      {/* Optional notes */}
      <input
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button type="submit">
        {editId ? "Update Record" : "Add Record"}
      </button>

      {/* Cancel button only shows when editing */}
      {editId && (
        <button
          type="button"
          onClick={() => {
            setEditId(null);
            setWeekDate("");
            setTotalMeals("");
            setNotes("");
          }}
        >
          Cancel
        </button>
      )}
    </form>
    <h3>All Kitchen Records</h3>

{kitchenRecords.length === 0 ? (
  <p>No kitchen records found.</p>
) : (
  <table>
    <thead>
      <tr>
        <th>Week Date</th>
        <th>Total Meals Served</th>
        <th>Notes</th>
        <th>Created By</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {kitchenRecords.map((record) => (
        <tr key={record.id}>
          <td>{formatDate(record.week_date)}</td>
          <td>{record.total_meals_served}</td>
          <td>{record.notes || "—"}</td>
          <td>User #{record.created_by}</td>
          <td>
            <button onClick={() => handleEdit(record)}>Edit</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}
  </div>
);
}