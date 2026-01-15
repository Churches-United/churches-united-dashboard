import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useStore from "../../zustand/store";
import '../../styles/tables.css';
import './Shelter.css';

function ShelterReporting() {
  const [activeTab, setActiveTab] = useState("guests");
  const [year, setYear] = useState(2025);

  const summary = useStore((state) => state.shelterReports?.summary);
  const guests = useStore((state) => state.shelterReports?.guests);
  const incidents = useStore((state) => state.shelterReports?.incidents);
  const loading = useStore((state) => state.shelterReports?.loading);
  const error = useStore((state) => state.shelterReports?.error);

  const fetchSummary = useStore((state) => state.fetchShelterSummary);
  const fetchGuests = useStore((state) => state.fetchShelterGuests);
  const fetchIncidents = useStore((state) => state.fetchShelterIncidents);

  useEffect(() => {
    if (activeTab === "summary") fetchSummary(year);
    if (activeTab === "guests") fetchGuests(year);
    if (activeTab === "incidents") fetchIncidents(year);
  }, [activeTab, year, fetchSummary, fetchGuests, fetchIncidents]);

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US');
  };

  if (loading) return <div className="table-loading">Loading...</div>;
  if (error) return <div className="table-error">Error: {error}</div>;

  // ========== GUESTS TAB RENDER ==========
  
  const renderGuests = () => {
    if (!guests) {
      return (
        <div className="table-empty">
          <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.4 }}>🏠</div>
          <p>No guest data available for {year}</p>
        </div>
      );
    }

    return (
      <div style={{ padding: '20px 0' }}>
        
        <h3 className="shelter-section-header">Guest Demographics Summary</h3>

        {/* Tables in 2 columns */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '24px',
          marginBottom: '32px'
        }}>
          
          {/* Annual Totals */}
          <div>
            <h4 className="shelter-table-header">Annual Totals</h4>
            <div className="table-container">
              <table className="table-app" style={{ fontSize: '0.875rem' }}>
                <tbody>
                  <tr>
                    <td><strong>Total All Guests:</strong></td>
                    <td className="col-number" style={{ fontWeight: 'bold', color: 'var(--brand-primary)' }}>
                      {guests.total_all_guests?.toLocaleString() || 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Average Guests/Week:</td>
                    <td className="col-number">{guests.avg_guests_per_week || 0}</td>
                  </tr>
                  <tr>
                    <td>Total Weeks Reported:</td>
                    <td className="col-number">{guests.total_weeks || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Stats */}
          <div>
            <h4 className="shelter-table-header">Top Categories</h4>
            <div className="table-container">
              <table className="table-app" style={{ fontSize: '0.875rem' }}>
                <tbody>
                  <tr>
                    <td>Single Men:</td>
                    <td className="col-number">{guests.pct_single_men || 0}% of total</td>
                  </tr>
                  <tr>
                    <td>Single Women:</td>
                    <td className="col-number">{guests.pct_single_women || 0}% of total</td>
                  </tr>
                  <tr>
                    <td>Families:</td>
                    <td className="col-number">{guests.pct_families || 0}% of total</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Guest Categories - Full Width Table */}
        <h4 className="shelter-table-header">Guest Categories Breakdown</h4>
        <div className="table-container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <table className="table-app table-hover table-striped">
            <thead>
              <tr>
                <th>Category</th>
                <th className="col-number">Total</th>
                <th className="col-number">Avg/Week</th>
                <th className="col-number">Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Single Men</td>
                <td className="col-number">{guests.total_single_men?.toLocaleString() || 0}</td>
                <td className="col-number">{guests.avg_single_men_per_week || 0}</td>
                <td className="col-number">{guests.pct_single_men || 0}%</td>
              </tr>
              <tr>
                <td>Housing Men</td>
                <td className="col-number">{guests.total_housing_men?.toLocaleString() || 0}</td>
                <td className="col-number">{guests.avg_housing_men_per_week || 0}</td>
                <td className="col-number">{guests.pct_housing_men || 0}%</td>
              </tr>
              <tr>
                <td>Single Women</td>
                <td className="col-number">{guests.total_single_women?.toLocaleString() || 0}</td>
                <td className="col-number">{guests.avg_single_women_per_week || 0}</td>
                <td className="col-number">{guests.pct_single_women || 0}%</td>
              </tr>
              <tr>
                <td>Housing Women</td>
                <td className="col-number">{guests.total_housing_women?.toLocaleString() || 0}</td>
                <td className="col-number">{guests.avg_housing_women_per_week || 0}</td>
                <td className="col-number">{guests.pct_housing_women || 0}%</td>
              </tr>
              <tr>
                <td>Families</td>
                <td className="col-number">{guests.total_families?.toLocaleString() || 0}</td>
                <td className="col-number">{guests.avg_families_per_week || 0}</td>
                <td className="col-number">{guests.pct_families || 0}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ========== INCIDENTS TAB RENDER ==========
  
  const renderIncidents = () => {
    if (!incidents) {
      return (
        <div className="table-empty">
          <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.4 }}>⚠️</div>
          <p>No incidents data available for {year}</p>
        </div>
      );
    }

    return (
      <div style={{ padding: '20px 0' }}>
        
        <h3 className="shelter-section-header">Incidents & Outreach Summary</h3>

        {/* Single centered table */}
        <div style={{ 
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <h4 className="shelter-table-header">Annual Summary</h4>
          <div className="table-container">
            <table className="table-app table-hover" style={{ fontSize: '0.95rem' }}>
              <tbody>
                <tr>
                  <td style={{ width: '60%' }}><strong>Total Incident Reports:</strong></td>
                  <td className="col-number" style={{ fontWeight: 'bold', color: '#dc3545' }}>
                    {incidents.total_incident_reports?.toLocaleString() || 0}
                  </td>
                </tr>
                <tr>
                  <td>Average Incidents per Week:</td>
                  <td className="col-number">{incidents.avg_incidents_per_week || 0}</td>
                </tr>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <td colSpan="2" style={{ padding: '8px' }}></td>
                </tr>
                <tr>
                  <td><strong>Total Community Members Served:</strong></td>
                  <td className="col-number" style={{ fontWeight: 'bold', color: 'var(--brand-primary)' }}>
                    {incidents.total_community_members_served?.toLocaleString() || 0}
                  </td>
                </tr>
                <tr>
                  <td>Average Community Served per Week:</td>
                  <td className="col-number">{incidents.avg_community_served_per_week || 0}</td>
                </tr>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <td colSpan="2" style={{ padding: '8px' }}></td>
                </tr>
                <tr>
                  <td><strong>Total Nights Found Sleeping Outside:</strong></td>
                  <td className="col-number" style={{ fontWeight: 'bold' }}>
                    {incidents.total_nights_outside?.toLocaleString() || 0}
                  </td>
                </tr>
                <tr>
                  <td>Total Weeks Reported:</td>
                  <td className="col-number">{incidents.total_weeks || 0}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ========== SUMMARY TAB RENDER ==========
  
  const renderSummary = () => {
    if (!summary || summary.length === 0) {
      return (
        <div className="table-empty">
          <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.4 }}>📋</div>
          <p>No summary data available for {year}</p>
        </div>
      );
    }

    return (
      <div style={{ padding: '20px 0' }}>
        
        <h3 className="shelter-section-header">Weekly Shelter Data</h3>

        <div className="table-container" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <table className="table-app table-hover table-striped">
            <thead>
              <tr>
                <th>Week Of</th>
                <th className="col-number">Total Guests</th>
                <th className="col-number">Single Men</th>
                <th className="col-number">Housing Men</th>
                <th className="col-number">Single Women</th>
                <th className="col-number">Housing Women</th>
                <th className="col-number">Families</th>
                <th className="col-number">Incidents</th>
                <th className="col-number">Community Served</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((week, index) => (
                <tr key={index}>
                  <td>{formatDate(week.date)}</td>
                  <td className="col-number" style={{ fontWeight: '600' }}>{week.total_guests || 0}</td>
                  <td className="col-number">{week.single_men || 0}</td>
                  <td className="col-number">{week.housing_men || 0}</td>
                  <td className="col-number">{week.single_women || 0}</td>
                  <td className="col-number">{week.housing_women || 0}</td>
                  <td className="col-number">{week.families || 0}</td>
                  <td className="col-number" style={{ color: week.incident_reports > 0 ? '#dc3545' : '#666' }}>
                    {week.incident_reports || 0}
                  </td>
                  <td className="col-number">{week.community_members_served || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ========== MAIN RENDER ==========
  
  return (
    <div className="shelter-hub-container">
      <div className="shelter-department-header">
        <h2>Shelter Reports - {year}</h2>
        <div className="shelter-department-actions">
          <Link to="/shelter">Data Entry</Link>
          <Link to="/shelter/reports" className="active">Reports</Link>
        </div>
      </div>

      <div className="shelter-year-selector">
        <label>Year:</label>
        <select 
          value={year} 
          onChange={(e) => setYear(parseInt(e.target.value))}
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>

      <div className="shelter-tabs-container">
        <button 
          className={`shelter-tab-button ${activeTab === "guests" ? "active" : ""}`}
          onClick={() => setActiveTab("guests")}
        >
          Guest Breakdown
        </button>
        <button 
          className={`shelter-tab-button ${activeTab === "incidents" ? "active" : ""}`}
          onClick={() => setActiveTab("incidents")}
        >
          Incidents & Outreach
        </button>
        <button 
          className={`shelter-tab-button ${activeTab === "summary" ? "active" : ""}`}
          onClick={() => setActiveTab("summary")}
        >
          Weekly Summary
        </button>
      </div>

      <div>
        {activeTab === "guests" && renderGuests()}
        {activeTab === "incidents" && renderIncidents()}
        {activeTab === "summary" && renderSummary()}
      </div>
    </div>
  );
}

export default ShelterReporting;

