import { useEffect } from "react";
import useStore from "../../zustand/store";

export default function HousingTable({ onEdit, year, building, search }) {
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

  // Filter records based on year, building, and search
  const filteredRecords = housingRecords.filter((r) => {
    if (year && new Date(r.month_date).getFullYear() !== Number(year))
      return false;
    if (building && r.building_name !== building) return false;
    if (search) {
      const term = search.toLowerCase();
      const combined = `${r.building_name} ${r.notes ?? ""}`.toLowerCase();
      if (!combined.includes(term)) return false;
    }
    return true;
  });

  if (loadingHousing) return <p>Loading housing records...</p>;

  return (
    <div className="table-container" style={{ maxWidth: "100%" }}>
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
          {filteredRecords.map((r) => (
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
