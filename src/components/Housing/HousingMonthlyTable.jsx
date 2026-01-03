import useStore from "../../zustand/store";

export default function HousingMonthlyTable() {
  const rows = useStore((s) => s.housingMonthlyReport);
  const loading = useStore((s) => s.loadingHousingReports);

  if (loading) return <p>Loading report…</p>;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Month</th>
          <th>Building</th>
          <th>Occupancy %</th>
          <th>Operational Reserves</th>
          <th>Replacement Reserves</th>
          <th>Current Vacancies</th>
          <th>Upcoming Vacancies</th>
          <th>New Leases</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td>
              {new Date(r.month_start).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </td>
            <td>{r.building_name}</td>
            <td>{r.occupancy_percent}%</td>
            <td>${r.operational_reserves}</td>
            <td>${r.replacement_reserves}</td>
            <td>{r.current_vacancies}</td>
            <td>{r.upcoming_vacancies}</td>
            <td>{r.upcoming_new_leases}</td>
            <td>{r.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
