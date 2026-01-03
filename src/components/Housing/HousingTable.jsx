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
    <table className="table">
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
              <button onClick={() => onEdit(r)}>Edit</button>
              <button
                onClick={() =>
                  handleDelete(r.housing_building_id, r.month_date)
                }
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
