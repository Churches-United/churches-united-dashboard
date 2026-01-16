export default function VolunteerKPI({ title, monthlyReports = [], valueField, color = "black" }) {
  if (!monthlyReports.length) return null;

  const sortedReports = [...monthlyReports].sort(
    (a, b) => new Date(a.month_start) - new Date(b.month_start)
  );

  const currentPeriod = sortedReports[sortedReports.length - 1];
  const monthLabel = currentPeriod.month_start
    ? new Date(currentPeriod.month_start).toLocaleString("default", { month: "long" })
    : "";

  const periodValue = Number(currentPeriod[valueField] ?? 0);

  const currentYear = new Date(currentPeriod.month_start).getFullYear();
  const ytdValue = monthlyReports
    .filter(r => new Date(r.month_start).getFullYear() === currentYear)
    .reduce((sum, r) => sum + Number(r[valueField] ?? 0), 0);

  return (
    <div className="kpi-card outreach">
      <h4 className="kpi-title outreach">{title}</h4>
      <p className="kpi-value outreach" style={{ color }}>
        {periodValue}
      </p>
      <small className="kpi-subtext outreach">YTD: {ytdValue}</small>
    </div>
  );
}
