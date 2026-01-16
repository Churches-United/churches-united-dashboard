export default function DevelopmentKPI({ title, value, color = "blue" }) {
  return (
    <div className={`kpi-card kpi-${color}`}>
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{value}</div>
    </div>
  );
}
