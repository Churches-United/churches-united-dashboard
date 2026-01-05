export default function DonationTable({ donations, onEdit, onDelete }) {
  const formatDate = (date) => new Date(date).toLocaleDateString("en-US");

  if (donations.length === 0) return <p>No donations found.</p>;

  return (
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
        {donations.map((d) => (
          <tr key={d.id}>
            <td>{formatDate(d.date)}</td>
            <td>{d.donor_name}</td>
            <td>${Number(d.amount).toFixed(2)}</td>
            <td>{d.notable ? "Yes" : "No"}</td>
            <td>{d.restricted ? "Yes" : "No"}</td>
            <td>{d.notes || "—"}</td>
            <td>
              <button onClick={() => onEdit(d)}>Edit</button>
              <button onClick={() => onDelete(d.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
