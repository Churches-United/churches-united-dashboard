import useStore from "../../../zustand/store";
import { useEffect, useMemo } from "react";

export const numberFormatter = new Intl.NumberFormat("en-US");

export default function HRMonthlyReport({ filters }) {
  const hrRecords = useStore((state) => state.hrRecords);
  const fetchHRRecords = useStore((state) => state.fetchHRRecords);
  const hrLoading = useStore((state) => state.hrLoading);

  useEffect(() => {
    fetchHRRecords();
  }, [fetchHRRecords]);

  const monthlyData = useMemo(() => {
    if (!hrRecords) return [];

    const monthMap = {};

    hrRecords.forEach((record) => {
      const date = new Date(record.week_date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const monthLabel = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });

      if (!monthMap[monthKey]) {
        monthMap[monthKey] = {
          monthKey,
          monthLabel,
          totalPositions: 0,
          totalOpen: 0,
          totalHires: 0,
          totalTurnover: 0,
          totalEvaluations: 0,
          recordCount: 0,
          year: date.getFullYear(),
        };
      }

      monthMap[monthKey].totalPositions += record.total_positions || 0;
      monthMap[monthKey].totalOpen += record.open_positions || 0;
      monthMap[monthKey].totalHires += record.new_hires_this_week || 0;
      monthMap[monthKey].totalTurnover += record.employee_turnover || 0;
      monthMap[monthKey].totalEvaluations += record.evaluations_due || 0;
      monthMap[monthKey].recordCount += 1;
    });

    return Object.values(monthMap).sort((a, b) => b.monthKey.localeCompare(a.monthKey));
  }, [hrRecords]);

  if (hrLoading) return <p>Loading monthly reports...</p>;

  const filteredReports = monthlyData.filter((r) => {
    if (filters?.year) {
      return r.year === Number(filters.year);
    }
    return true;
  });

  return (
    <div className="table-container">
      <table className="table-app table-hover table-striped">
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Positions</th>
            <th>Open Positions</th>
            <th>New Hires</th>
            <th>Turnover</th>
            <th>Evaluations Due</th>
            <th>Weekly Records</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((r) => (
            <tr key={r.monthKey}>
              <td>{r.monthLabel}</td>
              <td className="col-number">
                {numberFormatter.format(r.totalPositions)}
              </td>
              <td className="col-number">
                {numberFormatter.format(r.totalOpen)}
              </td>
              <td className="col-number">
                {numberFormatter.format(r.totalHires)}
              </td>
              <td className="col-number">
                {numberFormatter.format(r.totalTurnover)}
              </td>
              <td className="col-number">
                {numberFormatter.format(r.totalEvaluations)}
              </td>
              <td className="col-number">{r.recordCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
