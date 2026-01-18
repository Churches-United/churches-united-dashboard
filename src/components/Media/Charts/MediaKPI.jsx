export default function MediaKPI({ title, value }) {
  return (
    <div className="kpi-card media">
      <div className="kpi-title media">{title}</div>
      <div className="kpi-value media">{value}</div>
    </div>
  );
}
