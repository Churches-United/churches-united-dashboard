import useStore from "../../../zustand/store";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function VolunteerEngagementList({ onEdit, filters = {} }) {
  const engagements = useStore((state) => state.engagements);

  const filtered = engagements.filter((e) => {
    const matchesVolunteer =
      !filters.volunteerId || e.volunteer_id.toString() === filters.volunteerId;
    const matchesLocation =
      !filters.location || e.location === filters.location;
    const matchesYear =
      !filters.year ||
      new Date(e.event_date).getFullYear().toString() === filters.year;
    const matchesSearch =
      !filters.search ||
      e.location.toLowerCase().includes(filters.search.toLowerCase()) ||
      (e.volunteer_name &&
        e.volunteer_name.toLowerCase().includes(filters.search.toLowerCase()));

    return matchesVolunteer && matchesLocation && matchesYear && matchesSearch;
  });

  if (filtered.length === 0) return <p>No engagements logged.</p>;

  return (
    <div className="table-container table-contained">
      <table className="table-app table-contained">
        <thead>
          <tr>
            <th>Volunteer</th>
            <th>Date</th>
            <th>Location</th>
            <th># Volunteers</th>
            <th>Signups</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((e) => (
            <tr key={e.id}>
              <td>{e.volunteer_name}</td>
              <td>{new Date(e.event_date).toLocaleDateString()}</td>
              <td>{e.location}</td>
              <td>{e.number_volunteers}</td>
              <td>{e.software_signups || 0}</td>
              <td>
                <div className="table-actions">
                  <button
                    className="btn-table-edit"
                    onClick={() => onEdit(e.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn-table-delete"
                    onClick={() => {
                      if (window.confirm("Delete this engagement?"))
                        deleteEngagement(e.id);
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
