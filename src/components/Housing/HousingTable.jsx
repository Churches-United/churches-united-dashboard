// Traditional BS styling with theme. 
import { useEffect } from "react";
import useStore from "../../zustand/store";

export default function HousingTable({ onEdit }) {
  const housingRecords = useStore((state) => state.housingRecords);
  const deleteHousingRecord = useStore((state) => state.deleteHousingRecord);
  const loadingHousing = useStore((state) => state.loadingHousing);
  const fetchHousingRecords = useStore((state) => state.fetchHousingRecords);

  useEffect(() => {
    fetchHousingRecords();
  }, [fetchHousingRecords]);

  const handleDelete = async (buildingId, month) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;

    try {
      await deleteHousingRecord(buildingId, month);
      await fetchHousingRecords();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loadingHousing) return <p>Loading housing records...</p>;

  return (
    <div className="table-container" style={{ maxWidth: "1400px" }}>
      <table className="table-app table-hover table-striped">
        <thead>
          <tr>
            <th>Building</th>
            <th>Month</th>
            <th>Occupancy %</th>
            <th>Operational Reserves</th>
            <th>Replacement Reserves</th>
            <th>Current Vacancies</th>
            <th>Upcoming Vacancies</th>
            <th>Upcoming New Leases</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {housingRecords.map((r) => (
            <tr key={`${r.housing_building_id}-${r.month_date}`}>
              <td>{r.building_name}</td>
              <td>
                {new Date(r.month_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </td>
              <td>{r.occupancy_percent ?? "-"}</td>
              <td>${r.operational_reserves ?? 0}</td>
              <td>${r.replacement_reserves ?? 0}</td>
              <td>{r.current_vacancies ?? 0}</td>
              <td>{r.upcoming_vacancies ?? 0}</td>
              <td>{r.upcoming_new_leases ?? 0}</td>
              <td>{r.notes ?? "-"}</td>
              <td>
                <div className="table-actions">
                  <button
                    className="btn btn-sm btn-table-edit"
                    onClick={() => onEdit(r)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-table-delete"
                    onClick={() =>
                      handleDelete(r.housing_building_id, r.month_date)
                    }
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


// DataTable component styling using theme

// import { useEffect } from "react";
// import useStore from "../../zustand/store";
// import DataTable from "../DesignComponents/DataTable";

// export default function HousingTable({ onEdit }) {
//   const housingRecords = useStore((state) => state.housingRecords);
//   const deleteHousingRecord = useStore((state) => state.deleteHousingRecord);
//   const loadingHousing = useStore((state) => state.loadingHousing);
//   const fetchHousingRecords = useStore((state) => state.fetchHousingRecords);

//   useEffect(() => {
//     fetchHousingRecords();
//   }, [fetchHousingRecords]);

//   const handleDelete = async (buildingId, month) => {
//     if (!window.confirm("Are you sure you want to delete this record?")) return;

//     try {
//       await deleteHousingRecord(buildingId, month);
//       await fetchHousingRecords();
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }
//   };

//   // Define columns for DataTable
//   const columns = [
//     { key: "building_name", label: "Building" },
//     {
//       key: "month_date",
//       label: "Month",
//       render: (r) =>
//         new Date(r.month_date).toLocaleDateString("en-US", {
//           year: "numeric",
//           month: "short",
//         }),
//     },
//     { key: "occupancy_percent", label: "Occupancy %" },
//     {
//       key: "operational_reserves",
//       label: "Operational Reserves",
//       render: (r) => `$${r.operational_reserves ?? 0}`,
//     },
//     {
//       key: "replacement_reserves",
//       label: "Replacement Reserves",
//       render: (r) => `$${r.replacement_reserves ?? 0}`,
//     },
//     { key: "current_vacancies", label: "Current Vacancies" },
//     { key: "upcoming_vacancies", label: "Upcoming Vacancies" },
//     { key: "upcoming_new_leases", label: "Upcoming New Leases" },
//     { key: "notes", label: "Notes", render: (r) => r.notes ?? "-" },
//   ];

//   return (
//     <DataTable
//       columns={columns}
//       data={housingRecords}
//       isLoading={loadingHousing}
//       renderActions={(row) => (
//         <>
//           <button
//             className="btn btn-sm btn-table-edit"
//             onClick={() => onEdit(row)}
//           >
//             Edit
//           </button>
//           <button
//             className="btn btn-sm btn-table-delete"
//             onClick={() => handleDelete(row.housing_building_id, row.month_date)}
//           >
//             Delete
//           </button>
//         </>
//       )}
//       maxWidth="1400px"
//     />
//   );
// }