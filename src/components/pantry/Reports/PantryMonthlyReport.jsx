import useStore from "../../../zustand/store";
import { useEffect, useMemo } from "react";

export const numberFormatter = new Intl.NumberFormat("en-US");

export default function PantryMonthlyReport({ filters }) {
  const pantryRecords = useStore((state) => state.pantryRecords);
  const fetchPantryRecords = useStore((state) => state.fetchPantryRecords);
  const pantryLoading = useStore((state) => state.pantryLoading);

  useEffect(() => {
    fetchPantryRecords();
  }, [fetchPantryRecords]);

  const monthlyData = useMemo(() => {
    if (!pantryRecords) return [];

    const monthMap = {};

    pantryRecords.forEach((record) => {
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
          totalFirstTime: 0,
          totalReturning: 0,
          totalAdults: 0,
          totalChildren: 0,
          totalSeniors: 0,
          totalPounds: 0,
          recordCount: 0,
          year: date.getFullYear(),
        };
      }

      monthMap[monthKey].totalFirstTime += record.first_time_households || 0;
      monthMap[monthKey].totalReturning += record.returning_households || 0;
      monthMap[monthKey].totalAdults += record.total_adults || 0;
      monthMap[monthKey].totalChildren += record.total_children || 0;
      monthMap[monthKey].totalSeniors += record.total_seniors || 0;
      monthMap[monthKey].totalPounds += parseFloat(record.total_pounds_distributed) || 0;
      monthMap[monthKey].recordCount += 1;
    });

    return Object.values(monthMap).sort((a, b) => b.monthKey.localeCompare(a.monthKey));
  }, [pantryRecords]);

  if (pantryLoading) return <p>Loading monthly reports...</p>;

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
            <th>First-Time</th>
            <th>Returning</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Seniors</th>
            <th>Total Pounds</th>
            <th>Weekly Records</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((r) => (
            <tr key={r.monthKey}>
              <td>{r.monthLabel}</td>
              <td className="col-number">
                {numberFormatter.format(r.totalFirstTime)}
              </td>
              <td className="col-number">
                {numberFormatter.format(r.totalReturning)}
              </td>
              <td className="col-number">
                {numberFormatter.format(r.totalAdults)}
              </td>
              <td className="col-number">
                {numberFormatter.format(r.totalChildren)}
              </td>
              <td className="col-number">
                {numberFormatter.format(r.totalSeniors)}
              </td>
              <td className="col-number">
                {numberFormatter.format(r.totalPounds.toFixed(2))}
              </td>
              <td className="col-number">{r.recordCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
