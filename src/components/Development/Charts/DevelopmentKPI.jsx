export default function DevelopmentKPI({ title, value, color = "blue" }) {
  return (
    <div className={`kpi-card development`}>
      <div className="kpi-title development">{title}</div>
      <div className="kpi-value development">{value}</div>
    </div>
  );
}
