import { Link } from "react-router-dom";

export default function DevelopmentHome() {
  return (
    <div>
      <h2>Development</h2>
      <nav>
        <ul>
          <li>
            <Link to="donors">Donors</Link>
          </li>
          <li>
            <Link to="donations">Donations</Link>
          </li>
          <li>
            <Link to="events">Events</Link>
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
