import "./OutreachReports.css";

export default function VolunteerKPI({ title, monthlyReports = [], color = "black" }) {
  if (!monthlyReports.length) return null;

  // Sort reports ascending by month_start so the last one is the most recent
  const sortedReports = [...monthlyReports].sort(
    (a, b) => new Date(a.month_start) - new Date(b.month_start)
  );

  // Current period (most recent month)
  const currentPeriod = sortedReports[sortedReports.length - 1];

  // Month label
  const monthLabel = currentPeriod.month_start
    ? new Date(currentPeriod.month_start).toLocaleString("default", { month: "long" })
    : "";

  // Period value (e.g., total volunteers or signups)
  const periodValue =
    title === "Total Volunteers"
      ? Number(currentPeriod.total_volunteers ?? 0)
      : Number(currentPeriod.total_signups ?? 0);

  // YTD total: sum up all months in current year
  const currentYear = new Date(currentPeriod.month_start).getFullYear();
  const ytdValue = monthlyReports
    .filter((r) => new Date(r.month_start).getFullYear() === currentYear)
    .reduce((sum, r) => {
      if (title === "Total Volunteers") return sum + Number(r.total_volunteers ?? 0);
      return sum + Number(r.total_signups ?? 0);
    }, 0);

  return (
    <div className="kpi-card">
      <h4 className="kpi-title">{title} — {monthLabel}</h4>
      <p className="kpi-value" style={{ color }}>
        {periodValue}
      </p>
      <small className="kpi-subtext">YTD: {ytdValue}</small>
    </div>
  );
}
