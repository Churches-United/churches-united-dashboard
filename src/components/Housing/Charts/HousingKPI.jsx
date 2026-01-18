export default function HousingKPI({ title, value, subtext, color = "blue" }) {
  return (
    <div className="kpi-card housing">
      <div className="kpi-title housing">{title}</div>
      <div className="kpi-value housing" style={{ color }}>
        {value}
      </div>
      {subtext && <div className="kpi-subtext housing">{subtext}</div>}
    </div>
  );
}
