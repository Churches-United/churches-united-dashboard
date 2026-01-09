import React from "react";
import {
  currencyFormatter,
  numberFormatter,
  formatPercent,
} from "../../styles/formatters";

export default function HousingMonthlyTable({ records }) {
  if (!records || records.length === 0)
    return <p>No records match the current filters.</p>;

  return (
    <div className="table-container" style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <table className="table-app table-hover table-striped housing-table">
        <thead>
          <tr>
            <th className="col-month">Month</th>
            <th className="col-building">Building</th>
            <th className="col-number">Occupancy</th>
            <th className="col-number">
              Operational<br />Reserves
            </th>
            <th className="col-number">
              Replacement<br />Reserves
            </th>
            <th className="col-number">
              Current<br />Vacancies
            </th>
            <th className="col-number">
              Upcoming<br />Vacancies
            </th>
            <th className="col-number">
              Upcoming<br />Leases
            </th>
            <th className="col-notes">Notes</th>
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
                <td className="col-month">
                  {monthDate
                    ? monthDate.toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "-"}
                </td>

                <td className="col-building">{r.building_name ?? "-"}</td>

                <td className="col-number">
                  {r.occupancy_percent != null
                    ? formatPercent(r.occupancy_percent)
                    : "-"}
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
