export default function DonationTable({ donations, onEdit, onDelete }) {
  const formatDate = (date) => new Date(date).toLocaleDateString("en-US");

  if (donations.length === 0) return <p>No donations found.</p>;

  return (
    <div
      className="table-container"
      style={{ maxWidth: "1400px", margin: "0 auto" }}
    >
      <table className="table-app table-hover table-striped">
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
                <div className="table-actions">
                  <button
                    className="btn btn-sm btn-table-edit"
                    onClick={() => onEdit(r)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-table-delete"
                    onClick={() =>
                      handleDelete(r.housing_building_id, r.month_date)
                    }
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
  );
}
