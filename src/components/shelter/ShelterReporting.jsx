import { useEffect, useState } from "react";
import useStore from "../../zustand/store";

function ShelterReporting() {
  const [activeTab, setActiveTab] = useState("guests");
  const [year, setYear] = useState(2025);

  // Get all reports data from store
  const summary = useStore((state) => state.shelterReports?.summary);
  const guests = useStore((state) => state.shelterReports?.guests);
  const incidents = useStore((state) => state.shelterReports?.incidents);
  const loading = useStore((state) => state.shelterReports?.loading);
  const error = useStore((state) => state.shelterReports?.error);

  // Get fetch actions
  const fetchSummary = useStore((state) => state.fetchShelterSummary);
  const fetchGuests = useStore((state) => state.fetchShelterGuests);
  const fetchIncidents = useStore((state) => state.fetchShelterIncidents);

  // Fetch data when tab or year changes
  useEffect(() => {
    if (activeTab === "summary") fetchSummary(year);
    if (activeTab === "guests") fetchGuests(year);
    if (activeTab === "incidents") fetchIncidents(year);
  }, [activeTab, year, fetchSummary, fetchGuests, fetchIncidents]);

  if (loading) return <p>⏳ Loading reports...</p>;
  if (error) return <p style={{ color: 'red' }}>❌ Error: {error}</p>;

  // Render Summary Tab (Weekly Data)
  const renderSummary = () => {
    if (!summary || summary.length === 0) return <p>No summary data available</p>;

    return (
      <div>
        <h3>Weekly Summary</h3>
        <table border="1">
          <thead>
            <tr>
              <th>Week Of</th>
              <th>Total Guests</th>
              <th>Single Men</th>
              <th>Housing Men</th>
              <th>Single Women</th>
              <th>Housing Women</th>
              <th>Families</th>
              <th>Hybrid/VA</th>
              <th>Incidents</th>
              <th>Community Served</th>
              <th>Nights Outside</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((week) => (
              <tr key={week.date}>
                <td>{new Date(week.date).toLocaleDateString()}</td>
                <td>{week.total_guests || 0}</td>
                <td>{week.single_men || 0}</td>
                <td>{week.housing_men || 0}</td>
                <td>{week.single_women || 0}</td>
                <td>{week.housing_women || 0}</td>
                <td>{week.families || 0}</td>
                <td>{week.hybrid_va_holdover || 0}</td>
                <td>{week.incident_reports || 0}</td>
                <td>{week.community_members_served || 0}</td>
                <td>{week.nights_found_sleeping_outside || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render Guests Tab (Breakdown with Percentages)
  const renderGuests = () => {
    if (!guests) return <p>No guest data available</p>;

    return (
      <div>
        <h3>Guest Breakdown</h3>
        
        <fieldset>
          <legend>Annual Totals</legend>
          <table border="1">
            <tbody>
              <tr>
                <td><strong>Total All Guests:</strong></td>
                <td>{guests.total_all_guests?.toLocaleString() || 0}</td>
              </tr>
              <tr>
                <td><strong>Average Guests/Week:</strong></td>
                <td>{guests.avg_guests_per_week || 0}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        <fieldset>
          <legend>Guest Categories</legend>
          <table border="1">
            <thead>
              <tr>
                <th>Category</th>
                <th>Total</th>
                <th>Avg/Week</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Single Men</td>
                <td>{guests.total_single_men?.toLocaleString() || 0}</td>
                <td>{guests.avg_single_men_per_week || 0}</td>
                <td>{guests.pct_single_men || 0}%</td>
              </tr>
              <tr>
                <td>Housing Men</td>
                <td>{guests.total_housing_men?.toLocaleString() || 0}</td>
                <td>{guests.avg_housing_men_per_week || 0}</td>
                <td>{guests.pct_housing_men || 0}%</td>
              </tr>
              <tr>
                <td>Single Women</td>
                <td>{guests.total_single_women?.toLocaleString() || 0}</td>
                <td>{guests.avg_single_women_per_week || 0}</td>
                <td>{guests.pct_single_women || 0}%</td>
              </tr>
              <tr>
                <td>Housing Women</td>
                <td>{guests.total_housing_women?.toLocaleString() || 0}</td>
                <td>{guests.avg_housing_women_per_week || 0}</td>
                <td>{guests.pct_housing_women || 0}%</td>
              </tr>
              <tr>
                <td>Families</td>
                <td>{guests.total_families?.toLocaleString() || 0}</td>
                <td>{guests.avg_families_per_week || 0}</td>
                <td>{guests.pct_families || 0}%</td>
              </tr>
              <tr>
                <td>Hybrid/VA Holdover</td>
                <td>{guests.total_hybrid_va?.toLocaleString() || 0}</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
    );
  };

  // Render Incidents Tab
  const renderIncidents = () => {
    if (!incidents) return <p>No incidents data available</p>;

    return (
      <div>
        <h3>Incidents & Outreach</h3>
        
        <fieldset>
          <legend>Annual Summary</legend>
          <table border="1">
            <tbody>
              <tr>
                <td><strong>Total Incident Reports:</strong></td>
                <td>{incidents.total_incident_reports?.toLocaleString() || 0}</td>
              </tr>
              <tr>
                <td><strong>Avg Incidents/Week:</strong></td>
                <td>{incidents.avg_incidents_per_week || 0}</td>
              </tr>
              <tr>
                <td><strong>Total Community Members Served:</strong></td>
                <td>{incidents.total_community_members_served?.toLocaleString() || 0}</td>
              </tr>
              <tr>
                <td><strong>Avg Community Served/Week:</strong></td>
                <td>{incidents.avg_community_served_per_week || 0}</td>
              </tr>
              <tr>
                <td><strong>Total Nights Found Sleeping Outside:</strong></td>
                <td>{incidents.total_nights_outside?.toLocaleString() || 0}</td>
              </tr>
              <tr>
                <td><strong>Total Weeks Reported:</strong></td>
                <td>{incidents.total_weeks || 0}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
    );
  };

  return (
    <div>
      <h2>Shelter Reports - {year}</h2>

      {/* Year Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label>Year: </label>
        <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </div>

      {/* Tab Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab("guests")}>Guest Breakdown</button>
        <button onClick={() => setActiveTab("incidents")}>Incidents & Outreach</button>
        <button onClick={() => setActiveTab("summary")}>Weekly Summary</button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "guests" && renderGuests()}
        {activeTab === "incidents" && renderIncidents()}
        {activeTab === "summary" && renderSummary()}
      </div>
    </div>
  );
}

export default ShelterReporting;