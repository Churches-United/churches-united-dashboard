import { FaEdit, FaTrash } from "react-icons/fa";

export default function EventsList({ events, onEdit, onDelete }) {
  const formatDate = (date) => new Date(date).toLocaleString();

  if (events.length === 0) return <p>No events found.</p>;

  return (
    <div className="table-container">
      <table className="table-app table-hover table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date / Time</th>
            <th>Venue</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.name}</td>
              <td>{formatDate(event.datetime)}</td>
              <td>{event.venue}</td>
              <td>{event.type}</td>
              <td>
                <div className="table-actions">
                  <button
                    className="btn btn-sm btn-table-edit"
                    onClick={() => onEdit(event)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-table-delete"
                    onClick={() => onDelete(event.id)}
                  >
                    <FaTrash />
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
