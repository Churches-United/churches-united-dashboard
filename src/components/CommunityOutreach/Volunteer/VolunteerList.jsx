import useStore from "../../../zustand/store";

export default function VolunteerList({ onEdit }) {
  const volunteers = useStore((state) => state.volunteers);
  const deleteVolunteer = useStore((state) => state.deleteVolunteer);

  if (!volunteers.length) return <p>No volunteers found.</p>;

  return (
    <table className="table">
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
              <button onClick={() => onEdit(v)}>Edit</button>
              <button
                onClick={() => {
                  if (
                    window.confirm(`Are you sure you want to delete ${v.name}?`)
                  ) {
                    deleteVolunteer(v.id);
                  }
                }}
                style={{ marginLeft: "0.5rem" }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
