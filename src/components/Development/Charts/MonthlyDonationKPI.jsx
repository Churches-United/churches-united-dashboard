import React from "react";
import { currencyFormatter, numberFormatter } from "../../../styles/formatters.js";
import "./DevelopmentCharts.css";

export default function MonthlyDonationKPI({ month, total, count, topDonor }) {
  return (
    <div className="kpi-card development">
      <div className="kpi-title development">{month} Donations</div>
      <div className="donation-boxes">
        <div className="donation-box total">
          <div className="donation-value">{currencyFormatter.format(total)}</div>
          <div className="donation-label">Total</div>
        </div>
        <div className="donation-box count">
          <div className="donation-value">{numberFormatter.format(count)}</div>
          <div className="donation-label">Transactions</div>
        </div>
        <div className="donation-box top-donor">
          <div className="donation-value">{topDonor}</div>
          <div className="donation-label">Top Donor</div>
        </div>
      </div>
    </div>
  );
}
