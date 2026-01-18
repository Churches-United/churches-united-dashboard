export default function AdminUsersTable({ users }) {
  return (
    <div className="table-wrapper">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th style={{ width: "160px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={!user.active ? "row-muted" : ""}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.active ? "Active" : "Inactive"}</td>
              <td>
                <button className="btn btn-small">Edit</button>
                <button className="btn btn-small btn-warning">
                  {user.active ? "Deactivate" : "Activate"}
                </button>
                <button className="btn btn-small btn-danger">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
