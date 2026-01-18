import useStore from "../../../zustand/store";
import { useEffect } from "react";

export const numberFormatter = new Intl.NumberFormat("en-US");

export default function PantryWeeklyReport({ filters }) {
  const pantryRecords = useStore((state) => state.pantryRecords);
  const fetchPantryRecords = useStore((state) => state.fetchPantryRecords);
  const pantryLoading = useStore((state) => state.pantryLoading);

  useEffect(() => {
    fetchPantryRecords();
  }, [fetchPantryRecords]);

  if (pantryLoading) return <p>Loading weekly reports...</p>;

  const filteredReports = pantryRecords?.filter((r) => {
    let keep = true;

    if (filters?.year) {
      const reportYear = new Date(r.week_date).getFullYear();
      keep = keep && reportYear === Number(filters.year);
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      keep = keep && (r.notes?.toLowerCase().includes(search) || false);
    }

    return keep;
  });

  return (
    <div className="table-container">
      <table className="table-app table-hover table-striped">
        <thead>
          <tr>
            <th>Week Date</th>
            <th>First-Time</th>
            <th>Returning</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Seniors</th>
            <th>Total Pounds</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports?.length > 0 ? (
            filteredReports.map((r) => (
              <tr key={r.id}>
                <td>{r.week_range || new Date(r.week_date).toLocaleDateString()}</td>
                <td className="col-number">
                  {numberFormatter.format(r.first_time_households)}
                </td>
                <td className="col-number">
                  {numberFormatter.format(r.returning_households)}
                </td>
                <td className="col-number">
                  {numberFormatter.format(r.total_adults)}
                </td>
                <td className="col-number">
                  {numberFormatter.format(r.total_children)}
                </td>
                <td className="col-number">
                  {numberFormatter.format(r.total_seniors)}
                </td>
                <td className="col-number">
                  {numberFormatter.format(r.total_pounds_distributed)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
