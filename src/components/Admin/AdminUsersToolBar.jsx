export default function AdminUsersToolbar({
  search,
  setSearch,
  roleFilter,
  setRoleFilter,
}) {
  return (
    <div className="toolbar admin">
      <input
        type="text"
        placeholder="Search users by name or email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option value="all">All Roles</option>
        <option value="admin">Admin</option>
        <option value="staff">Staff</option>
        <option value="volunteer">Volunteer</option>
      </select>

      <button className="btn btn-primary">
        + Add User
      </button>
    </div>
  );
}
