import React from "react";
import useStore from "../../zustand/store";

export default function HousingMonthlyTable() {
  const rows = useStore((state) => state.housingMonthlyReport);
  const loading = useStore((state) => state.loadingHousingReports);

  if (loading) return <p>Loading report…</p>;

  return (
    <div className="table-container" style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <table className="table-app table-hover table-striped">
        <thead>
          <tr>
            <th>Month</th>
            <th>Building</th>
            <th>Occupancy %</th>
            <th>Operational Reserves</th>
            <th>Replacement Reserves</th>
            <th>Current Vacancies</th>
            <th>Upcoming Vacancies</th>
            <th>New Leases</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>
                {new Date(r.month_start).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td>{r.building_name}</td>
              <td>{r.occupancy_percent ?? "-" }%</td>
              <td>${r.operational_reserves ?? 0}</td>
              <td>${r.replacement_reserves ?? 0}</td>
              <td>{r.current_vacancies ?? 0}</td>
              <td>{r.upcoming_vacancies ?? 0}</td>
              <td>{r.upcoming_new_leases ?? 0}</td>
              <td>{r.notes ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// import React from "react";
// import useStore from "../../zustand/store";
// import DataTable from "../DesignComponents/DataTable";

// export default function HousingMonthlyTable() {
//   const rows = useStore((s) => s.housingMonthlyReport);
//   const loading = useStore((s) => s.loadingHousingReports);

//   // Define the columns for DataTable
//   const columns = [
//     {
//       key: "month_start",
//       label: "Month",
//       render: (row) =>
//         new Date(row.month_start).toLocaleDateString("en-US", {
//           month: "short",
//           year: "numeric",
//         }),
//     },
//     { key: "building_name", label: "Building" },
//     {
//       key: "occupancy_percent",
//       label: "Occupancy %",
//       render: (row) => (row.occupancy_percent ?? "-") + "%",
//     },
//     {
//       key: "operational_reserves",
//       label: "Operational Reserves",
//       render: (row) => `$${row.operational_reserves ?? 0}`,
//     },
//     {
//       key: "replacement_reserves",
//       label: "Replacement Reserves",
//       render: (row) => `$${row.replacement_reserves ?? 0}`,
//     },
//     { key: "current_vacancies", label: "Current Vacancies" },
//     { key: "upcoming_vacancies", label: "Upcoming Vacancies" },
//     { key: "upcoming_new_leases", label: "New Leases" },
//     { key: "notes", label: "Notes" },
//   ];

//   return (
//     <DataTable  
//       columns={columns}
//       data={rows}
//       isLoading={loading}
//       maxWidth="1400px"
//     />
//   );
// }