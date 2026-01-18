// import { useEffect, useState } from "react";
// import DepartmentHeader from "../DesignComponents/DepartmentHeader";
// import AdminUsersToolbar from "./AdminUsersToolbar";
// import AdminUsersTable from "./AdminUsersTable";
// import useStore from "../../zustand/store";

// export default function AdminUserManagement() {
//   const fetchUsers = useStore((store) => store.fetchUsers);
//   const users = useStore((store) => store.users);

//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const filteredUsers = users.filter((user) => {
//     const matchesSearch =
//       user.name.toLowerCase().includes(search.toLowerCase()) ||
//       user.email.toLowerCase().includes(search.toLowerCase());

//     const matchesRole = roleFilter === "all" || user.role === roleFilter;

//     return matchesSearch && matchesRole;
//   });

//   return (
//     <div className="hub-container admin">
//       <DepartmentHeader title="Admin — User Management" />

//       <AdminUsersToolbar
//         search={search}
//         setSearch={setSearch}
//         roleFilter={roleFilter}
//         setRoleFilter={setRoleFilter}
//       />

//       <AdminUsersTable users={filteredUsers} />
//     </div>
//   );
// }

import { useEffect } from "react";
import useStore from "../../zustand/store";
import DepartmentHeader from "../DesignComponents/DepartmentHeader";

export default function AdminUserManagement() {
  const fetchUsers = useStore((s) => s.fetchUsers);
  const users = useStore((s) => s.users);
  const loading = useStore((s) => s.usersLoading);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="hub-container admin">
      <DepartmentHeader title="Admin — Users" />

      {loading && <p>Loading users...</p>}

      {!loading && (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
