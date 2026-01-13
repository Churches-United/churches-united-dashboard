import { FaEdit, FaTrash } from "react-icons/fa";

export default function DonorList({ donors, onEdit, onDelete }) {
  if (donors.length === 0) return <p>No donors found.</p>;

  return (
    <div className="table-container" style={{ maxWidth: "800px" }}>
      <table className="table-app table-hover table-striped">
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
                    onClick={() => onEdit(donor)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-table-delete"
                    onClick={() => onDelete(donor.id)}
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
