import MonthlyDonationKPI from "../../Development/Charts/MonthlyDonationKPI";
import MonthlyDonationChart from "../../Development/Charts/MonthlyDonationChart";
import MonthlyDonationPie from "../../Development/Charts/MonthlyDonationPie";
import DevelopmentKPI from "../../Development/Charts/DevelopmentKPI";
import "./ReportsSummary.css";

export default function DevelopmentSummary({ monthlyReports, donations, events }) {
  const now = new Date();
  const monthName = now.toLocaleString("default", { month: "long" });

  // ---------- KPIs from monthlyReports ----------
  const latestMonth = monthlyReports[monthlyReports.length - 1] || {};

  const totalDonationsMonth = Number(latestMonth.total_amount || 0);
  const donationCountMonth = Number(latestMonth.donation_count || 0);

  // Compute top donor for latest month
  let topDonor = "N/A";
  if (latestMonth.donors && latestMonth.donors.length) {
    const sortedDonors = [...latestMonth.donors].sort((a, b) => b.amount - a.amount);
    const top = sortedDonors[0];
    topDonor = `${top.name} ($${top.amount.toLocaleString()})`;
  }

  // ---------- Upcoming events ----------
  const upcomingEvents = events
    .map((e) => ({ ...e, dateObj: new Date(e.datetime) }))
    .filter((e) => e.dateObj >= now)
    .sort((a, b) => a.dateObj - b.dateObj)
    .slice(0, 3);

  // ---------- Pie chart data (last 6 months) ----------
  let restricted = 0;
  let unrestricted = 0;
  const last6 = [...monthlyReports]
    .sort((a, b) => new Date(a.month_start) - new Date(b.month_start))
    .slice(-6);

  last6.forEach((r) => {
    const total = Number(r.total_amount || 0);
    const restrictedAmount = Number(r.restricted_amount || 0);
    restricted += restrictedAmount;
    unrestricted += total - restrictedAmount;
  });

  return (
    <div className="summary-card summary-card-development">
      <h4 className="summary-title">Development</h4>

      {/* ---------- Charts ---------- */}
      <div className="summary-charts-row summary-charts-row-development">
        <div className="summary-chart summary-chart-donations">
          {/* <h5 className="chart-title">Monthly Donations — Last 6 Months</h5> */}
          <MonthlyDonationChart
            reports={monthlyReports}
            height={260}
            compact
            className="monthly-donation-chart"
              style={{ width: "100%" }}

          />
        </div>

        {/* <div className="summary-chart summary-chart-pie">
          <h5 className="chart-title">Restricted vs Unrestricted Donations</h5>
          <MonthlyDonationPie
            restricted={restricted}
            unrestricted={unrestricted}
            className="monthly-donation-pie"
          />
        </div> */}
      </div>
            {/* ---------- KPIs ---------- */}
      <div className="summary-kpis summary-kpis-development">
        <MonthlyDonationKPI
          month={monthName}
          total={totalDonationsMonth}
          count={donationCountMonth}
          topDonor={topDonor}
          className="kpi-card monthly-donation-kpi"
        />
      </div>

      {/* ---------- Next Event ---------- */}
      <div className="summary-next-event summary-next-event-development">
        <DevelopmentKPI
          title="Upcoming Events"
          value={
            upcomingEvents.length > 0
              ? upcomingEvents.map((e, i) => (
                  <div key={i} className="next-event-item">
                    {`${e.name} (${e.dateObj.toLocaleDateString()})`}
                  </div>
                ))
              : "N/A"
          }
          className="kpi-card next-event-kpi"
        />
      </div>
    </div>
  );
}
