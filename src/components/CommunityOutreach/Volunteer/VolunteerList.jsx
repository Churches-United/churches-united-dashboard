import useStore from "../../../zustand/store";

export default function VolunteerList({ onEdit }) {
  const volunteers = useStore((state) => state.volunteers);
  const deleteVolunteer = useStore((state) => state.deleteVolunteer);

  if (!volunteers.length) return <p>No volunteers found.</p>;

  return (
    <div className="table-container" style={{ maxWidth: "800px" }}>
      <table className="table-app table-hover table-striped">
        {" "}
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Type</th>
            <th align="left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((v) => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td>{v.type}</td>
              <td>
                <div className="table-actions">
                  <button
                    className="btn btn-sm btn-table-edit"
                    onClick={() => onEdit(v)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-table-delete"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete ${v.name}?`
                        )
                      ) {
                        deleteVolunteer(v.id);
                      }
                    }}
                    style={{ marginLeft: "0.5rem" }}
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
