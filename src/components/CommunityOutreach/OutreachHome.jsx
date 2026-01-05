import { Link } from "react-router-dom";

export default function OutreachHome() {
  return (
    <div>
      <h2>Volunteer Information</h2>
      <nav>
        <ul>
          <li>
            <Link to="volunteers">Volunteers</Link>
          </li>
          <li>
            <Link to="engagements">Volunteer Engagement</Link>
          </li>
        </ul>
      </nav>

      <section style={{ marginTop: "2rem" }}>
        <h3>Quick Overview</h3>
        <p>Summary metrics/graphs/cards coming soon.</p>
      </section>
    </div>
  );
}
