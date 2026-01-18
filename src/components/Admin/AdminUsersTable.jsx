import "./Admin.css";

export default function AdminUsersTable({ users, onEdit, onToggleActive }) {
  return (
    <div className="table-container admin-users-table">
      <table className="table-app">
        <thead>
          <tr>
            <th className="col-id">ID</th>
            <th className="col-username">Username</th>
            <th className="col-name">Name</th>
            <th className="col-email">Email</th>
            <th className="col-role">Role</th>
            <th className="col-department">Department</th>
            <th className="col-active">Active</th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={!user.active ? "row-muted" : ""}>
              <td className="col-id">{user.id}</td>
              <td className="col-username">{user.username}</td>
              <td className="col-name">{user.first_name} {user.last_name}</td>
              <td className="col-email">{user.email}</td>
              <td className="col-role">{user.role}</td>
              <td className="col-department">{user.department}</td>
              <td className="col-active">{user.active ? "Yes" : "No"}</td>
              <td className="col-actions">
                <div className="table-actions">
                  <button className="btn-table-edit" onClick={() => onEdit(user)}>
                    Edit
                  </button>
                  <button
                    className="btn-table-delete"
                    onClick={() => onToggleActive(user.id, !user.active)}
                  >
                    {user.active ? "Deactivate" : "Activate"}
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
