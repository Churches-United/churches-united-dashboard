import React from "react";

export default function HousingMonthlyTable({ records }) {
  if (!records || records.length === 0)
    return <p>No records match the current filters.</p>;

  return (
    <div
      className="table-container"
      style={{ maxWidth: "1400px", margin: "0 auto" }}
    >
      <table className="table-app table-hover table-striped">
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
          {records.map((r, i) => {
            const monthDate = r.month_date
              ? new Date(r.month_date)
              : r.month_start
              ? new Date(r.month_start)
              : null;

            return (
              <tr key={i}>
                <td>
                  {monthDate
                    ? monthDate.toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "-"}
                </td>
                <td>{r.building_name ?? "-"}</td>
                <td>{r.occupancy_percent ?? "-"}%</td>
                <td>${r.operational_reserves ?? 0}</td>
                <td>${r.replacement_reserves ?? 0}</td>
                <td>{r.current_vacancies ?? 0}</td>
                <td>{r.upcoming_vacancies ?? 0}</td>
                <td>{r.upcoming_new_leases ?? 0}</td>
                <td>{r.notes ?? "-"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
