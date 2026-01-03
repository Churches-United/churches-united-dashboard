import useStore from "../../zustand/store";

export default function HousingMonthlySummary() {
  const summary = useStore((state) => state.housingMonthlySummary);
  const loading = useStore((state) => state.loadingHousingReports);

  if (loading) return <p>Loading summary…</p>;

  return (
    <section>
      <h3>Monthly Summary</h3>
      {summary.map((row) => (
        <div key={row.month_start} className="report-card">
          <strong>
            {new Date(row.month_start).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </strong>

          <p>Avg Occupancy: {row.avg_occupancy_percent}%</p>
          <p>Operational Reserves: ${row.total_operational_reserves}</p>
          <p>Replacement Reserves: ${row.total_replacement_reserves}</p>
          <p>Current Vacancies: {row.total_current_vacancies}</p>
        </div>
      ))}
    </section>
  );
}
