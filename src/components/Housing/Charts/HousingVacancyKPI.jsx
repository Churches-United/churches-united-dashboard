export function HousingVacancyKPI({ building, current, upcoming }) {
  return (
    <div className="kpi-card housing vacancy">
      <div className="kpi-title housing">{building}</div>
      <div className="kpi-title housing">Vacancies</div>
      <div className="vacancy-split">
        <div className="vacancy-box current">
          <div className="vacancy-value">{current}</div>
          <div className="vacancy-label">Current</div>
        </div>
        <div className="vacancy-box upcoming">
          <div className="vacancy-value">{upcoming}</div>
          <div className="vacancy-label">Upcoming</div>
        </div>
      </div>
    </div>
  );
}
