
export default function DonorsList({ donors, onEdit, onDelete }) {
  if (donors.length === 0)
    return <p className="table-empty">No donors found.</p>;

  return (
    <div className="table-container hub-container-donors">
      <table className="table-app donors-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.type}</td>
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
