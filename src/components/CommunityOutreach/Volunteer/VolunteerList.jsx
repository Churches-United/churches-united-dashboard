import useStore from "../../../zustand/store";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function VolunteerList({ onEdit, filters }) {
  const volunteers = useStore((state) => state.volunteers);

  const filtered = volunteers.filter((v) => {
    const matchesVolunteer =
      !filters.volunteerId || v.id.toString() === filters.volunteerId;
    const matchesSearch =
      !filters.search ||
      v.name.toLowerCase().includes(filters.search.toLowerCase());
    return matchesVolunteer && matchesSearch;
  });

  if (filtered.length === 0) return <p>No volunteers found.</p>;

  return (
    <div className="table-container table-contained">
      <table className="table-app table-hover table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((v) => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td>{v.type}</td>
              <td>
                <div className="table-actions">
                  <button className="btn-table-edit" onClick={() => onEdit(v)}>
                    <FaEdit />
                  </button>
                  <button
                    className="btn-table-delete"
                    onClick={() => {
                      if (window.confirm(`Delete ${v.name}?`))
                        deleteVolunteer(v.id);
                    }}
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
