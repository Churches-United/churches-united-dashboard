import VolunteerKPI from "../../CommunityOutreach/Reports/VolunteerKPI";
import MonthlyVolunteerYoYChart from "../../CommunityOutreach/Charts/MonthlyVolunteerYoYChart";
import useStore from "../../../zustand/store";
import { useEffect } from "react";

export default function OutreachSummary({ monthlyReports }) {
  const fetchVolunteerMonthlyReports = useStore(
    (state) => state.fetchVolunteerMonthlyReports
  );

  // Fetch data if monthlyReports is empty on first render
  useEffect(() => {
    if (!monthlyReports || monthlyReports.length === 0) {
      fetchVolunteerMonthlyReports();
    }
  }, [monthlyReports, fetchVolunteerMonthlyReports]);

  // sort by month_start so "latest month" is always correct
  const sortedReports = [...monthlyReports].sort(
    (a, b) => new Date(a.month_start) - new Date(b.month_start)
  );

  // Safely grab the latest month after sorting
  const latestMonth = sortedReports.at(-1);

  // Format the month name in UTC
  const monthName = latestMonth
    ? new Intl.DateTimeFormat("en-US", {
        month: "long",
        timeZone: "UTC",
      }).format(new Date(latestMonth.month_start))
    : "";

  // Avoid rendering before data is ready
  if (!sortedReports.length) {
    return null;
  }

  return (
    <div className="summary-card outreach">
      <h4 className="summary-title">Community Outreach</h4>

      <div className="summary-kpis summary-kpis-outreach">
        <VolunteerKPI
          title={`Total ${monthName} Volunteers`}
          // the same sorted data everywhere
          monthlyReports={sortedReports}
          valueField="total_volunteers"
          color="var(--brand-primary)"
        />
        <VolunteerKPI
          title={`${monthName} Software Signups`}
          monthlyReports={sortedReports}
          valueField="total_signups"
          color="green"
        />
      </div>

      <div className="summary-chart">
        <h5 className="chart-title">Monthly Volunteers — Last 6 Months</h5>
        <MonthlyVolunteerYoYChart
          // Charts and KPIs share the same source of truth
          reports={sortedReports}
          height={180}
          compact
        />
      </div>
    </div>
  );
}
