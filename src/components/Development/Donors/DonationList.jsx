// Plain number with commas
export const numberFormatter = new Intl.NumberFormat("en-US");

export default function DonationList({ donations, onEdit, onDelete }) {
  const formatDate = (date) => new Date(date).toLocaleDateString("en-US");

  if (donations.length === 0)
    return <p className="table-empty">No donations found.</p>;

  return (
    <div className="table-container hub-container-donations">
      <table className="table-app donation-table">
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
              <td className="col-number">
                ${numberFormatter.format(d.amount)}
              </td>

              <td>{d.notable ? "Yes" : "No"}</td>
              <td>{d.restricted ? "Yes" : "No"}</td>
              <td>{d.notes || "—"}</td>
              <td>
                <div className="table-actions">
                  <button className="btn-table-edit" onClick={() => onEdit(d)}>
                  Edit
                  </button>
                  <button
                    className="btn-table-delete"
                    onClick={() => onDelete(d.id)}
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
