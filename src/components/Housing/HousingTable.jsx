import { useEffect } from "react";
import useStore from "../../zustand/store";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  currencyFormatter,
  numberFormatter,
  formatPercent,
} from "../../styles/formatters";

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
      <table className="table-app table-hover table-striped housing-table">
        <thead>
          <tr>
            <th className="col-building">Building</th>
            <th className="col-month">Month</th>

            <th className="col-number">Occupancy</th>
            <th className="col-number">
              Operational
              <br />
              Reserves
            </th>
            <th className="col-number">
              Replacement
              <br />
              Reserves
            </th>
            <th className="col-number">
              Current
              <br />
              Vacancies
            </th>
            <th className="col-number">
              Upcoming
              <br />
              Vacancies
            </th>
            <th className="col-number">
              Upcoming
              <br />
              Leases
            </th>

            <th className="col-notes">Notes</th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((r) => (
            <tr key={`${r.housing_building_id}-${r.month_date}`}>
              <td className="col-building">{r.building_name}</td>

              <td className="col-month">
                {new Date(r.month_date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </td>
              <td className="col-number">
                {formatPercent(r.occupancy_percent)}
              </td>

              <td className="col-number">
                {r.operational_reserves != null
                  ? currencyFormatter.format(r.operational_reserves)
                  : "-"}
              </td>

              <td className="col-number">
                {r.replacement_reserves != null
                  ? currencyFormatter.format(r.replacement_reserves)
                  : "-"}
              </td>

              <td className="col-number">
                {r.current_vacancies != null
                  ? numberFormatter.format(r.current_vacancies)
                  : "-"}
              </td>

              <td className="col-number">
                {r.upcoming_vacancies != null
                  ? numberFormatter.format(r.upcoming_vacancies)
                  : "-"}
              </td>

              <td className="col-number">
                {r.upcoming_new_leases != null
                  ? numberFormatter.format(r.upcoming_new_leases)
                  : "-"}
              </td>

              <td className="col-notes">{r.notes ?? "-"}</td>

              <td className="col-actions">
                <div className="table-actions">
                  <button className="btn-table-edit" onClick={() => onEdit(r)}>
                    <FaEdit />
                  </button>
                  <button
                    className="btn-table-delete"
                    onClick={() =>
                      handleDelete(r.housing_building_id, r.month_date)
                    }
                  >
                    <FaTrash />
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
