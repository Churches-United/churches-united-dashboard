import useStore from "../../../zustand/store";
import { useEffect, useMemo } from "react";

export const numberFormatter = new Intl.NumberFormat("en-US");

export default function KitchenMonthlyReport({ filters }) {
  const kitchenRecords = useStore((state) => state.kitchenRecords);
  const fetchKitchenRecords = useStore((state) => state.fetchKitchenRecords);
  const kitchenLoading = useStore((state) => state.kitchenLoading);

  useEffect(() => {
    fetchKitchenRecords();
  }, [fetchKitchenRecords]);

  const monthlyData = useMemo(() => {
    if (!kitchenRecords) return [];

    const monthMap = {};

    kitchenRecords.forEach((record) => {
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
          totalMeals: 0,
          recordCount: 0,
          year: date.getFullYear(),
        };
      }

      monthMap[monthKey].totalMeals += record.total_meals_served || 0;
      monthMap[monthKey].recordCount += 1;
    });

    return Object.values(monthMap).sort((a, b) => b.monthKey.localeCompare(a.monthKey));
  }, [kitchenRecords]);

  if (kitchenLoading) return <p>Loading monthly reports...</p>;

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
            <th>Total Meals Served</th>
            <th>Weekly Records</th>
            <th>Average per Week</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((r) => (
            <tr key={r.monthKey}>
              <td>{r.monthLabel}</td>
              <td className="col-number">
                {numberFormatter.format(r.totalMeals)}
              </td>
              <td className="col-number">{r.recordCount}</td>
              <td className="col-number">
                {numberFormatter.format(Math.round(r.totalMeals / r.recordCount))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}