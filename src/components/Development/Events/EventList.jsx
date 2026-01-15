
export default function EventsList({ events, onEdit, onDelete }) {
  const formatDate = (date) => new Date(date).toLocaleString();

  if (events.length === 0)
    return <p className="table-empty">No events found.</p>;

  return (
    <div className="table-container hub-container-events">
      <table className="table-app events-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date / Time</th>
            <th>Venue</th>
            <th>Type</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <td>{e.name}</td>
              <td>{formatDate(e.datetime)}</td>
              <td>{e.venue}</td>
              <td>{e.type}</td>
              <td>{e.notes || "—"}</td>
              <td>
                <div className="table-actions">
                  <button className="btn-table-edit" onClick={() => onEdit(e)}>
                    Edit
                  </button>
                  <button
                    className="btn-table-delete"
                    onClick={() => onDelete(e.id)}
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
