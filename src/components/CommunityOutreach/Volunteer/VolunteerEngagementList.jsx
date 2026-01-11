import useStore from "../../../zustand/store";

export default function VolunteerEngagementList({ onEdit }) {
  const engagements = useStore((state) => state.engagements);
  const deleteEngagement = useStore((state) => state.deleteEngagement);

  if (!engagements.length)
    return <p className="table-empty">No engagements logged.</p>;

  return (
    <div className="table-container table-contained">
      <table className="table-app table-hover table-striped">
        <thead>
          <tr>
            <th>Volunteer</th>
            <th>Event Date</th>
            <th>Location</th>
            <th>Volunteers</th>
            <th>Software Signups</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {engagements.map((e) => (
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
                    Edit
                  </button>
                  <button
                    className="btn-table-delete"
                    onClick={() => {
                      if (window.confirm("Delete this engagement?"))
                        deleteEngagement(e.id);
                    }}
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
