import useStore from "../../../zustand/store";
import { useEffect } from "react";

export const numberFormatter = new Intl.NumberFormat("en-US");

export default function HRWeeklyReport({ filters }) {
  const hrRecords = useStore((state) => state.hrRecords);
  const fetchHRRecords = useStore((state) => state.fetchHRRecords);
  const hrLoading = useStore((state) => state.hrLoading);

  useEffect(() => {
    fetchHRRecords();
  }, [fetchHRRecords]);

  if (hrLoading) return <p>Loading weekly reports...</p>;

  const filteredReports = hrRecords?.filter((r) => {
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
            <th>Total Positions</th>
            <th>Open Positions</th>
            <th>New Hires</th>
            <th>Turnover</th>
            <th>Evaluations Due</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports?.length > 0 ? (
            filteredReports.map((r) => (
              <tr key={r.id}>
                <td>{r.week_range || new Date(r.week_date).toLocaleDateString()}</td>
                <td className="col-number">
                  {numberFormatter.format(r.total_positions)}
                </td>
                <td className="col-number">
                  {numberFormatter.format(r.open_positions)}
                </td>
                <td className="col-number">
                  {numberFormatter.format(r.new_hires_this_week)}
                </td>
                <td className="col-number">
                  {numberFormatter.format(r.employee_turnover)}
                </td>
                <td className="col-number">
                  {numberFormatter.format(r.evaluations_due)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
