import React from "react";
import useStore from "../../zustand/store";
import { currencyFormatter, formatPercent } from "../../styles/formatters";
import "./Housing.css";

export default function HousingMonthlySummary() {
  const summary = useStore((state) => state.housingMonthlySummary);
  const loading = useStore((state) => state.loadingHousingReports);

  if (loading) return <p>Loading summary…</p>;
  if (!summary || summary.length === 0) return <p>No summary data available.</p>;

  return (
    // todo - figure out what happened to styles...
    <section className="housing-summary-container">
      <h3>Monthly Summary</h3>

      <div className="summary-grid">
        {summary.map((row) => {
          const month = new Date(row.month_start).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          });

          return (
            <div key={row.month_start} className="summary-card">
              <div className="summary-header">{month}</div>
              <div className="summary-metrics">
                <div>
                  <span className="metric-label">Avg Occupancy:</span>
                  <span className="metric-value">
                    {formatPercent(row.avg_occupancy_percent)}
                  </span>
                </div>
                <div>
                  <span className="metric-label">Operational:</span>
                  <span className="metric-value">
                    {currencyFormatter.format(row.total_operational_reserves)}
                  </span>
                </div>
                <div>
                  <span className="metric-label">Replacement:</span>
                  <span className="metric-value">
                    {currencyFormatter.format(row.total_replacement_reserves)}
                  </span>
                </div>
                <div>
                  <span className="metric-label">Current Vacancies:</span>
                  <span className="metric-value">{row.total_current_vacancies}</span>
                </div>
                <div>
                  <span className="metric-label">Upcoming Vacancies:</span>
                  <span className="metric-value">{row.total_upcoming_vacancies}</span>
                </div>
                <div>
                  <span className="metric-label">New Leases:</span>
                  <span className="metric-value">{row.total_upcoming_new_leases}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
