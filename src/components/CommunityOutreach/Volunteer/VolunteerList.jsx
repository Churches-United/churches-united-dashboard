import useStore from "../../../zustand/store";

export default function VolunteerList({ onEdit }) {
  const volunteers = useStore((state) => state.volunteers);
  const deleteVolunteer = useStore((state) => state.deleteVolunteer);

  if (!volunteers.length)
    return <p className="table-empty">No volunteers found.</p>;

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
                    Edit
                  </button>
                  <button
                    className="btn-table-delete"
                    onClick={() => {
                      if (window.confirm(`Delete ${v.name}?`))
                        deleteVolunteer(v.id);
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
