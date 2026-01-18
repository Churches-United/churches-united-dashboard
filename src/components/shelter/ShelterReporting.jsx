import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useStore from "../../zustand/store";
import '../../styles/tables.css';

// Import chart components
import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";

// Import chart data functions
import { 
  getGuestCategoriesPieData, 
  getGuestCategoriesBarData,
  getIncidentsBreakdownData,
  getWeeklySummaryBarData 
} from './ShelterCharts';

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

  if (loading) {
    return (
      <div className="hub-container">
        <div className="table-loading">Loading reports...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hub-container">
        <div className="table-error">Error: {error}</div>
      </div>
    );
  }

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

    const pieData = getGuestCategoriesPieData(guests);
    const barData = getGuestCategoriesBarData(guests);

    return (
      <div style={{ padding: '20px 0' }}>
        
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#333' }}>
          Guest Demographics Overview
        </h3>

        {/* Charts - Side by Side */}
        {(pieData || barData) && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
            gap: '24px',
            marginBottom: '48px'
          }}>
            {pieData && (
              <div style={{ 
                maxHeight: '280px',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
              }}>
                <PieChart data={pieData} title="Guest Categories Distribution" />
              </div>
            )}
            
            {barData && (
              <div style={{ 
                maxHeight: '280px',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
              }}>
                <BarChart 
                  data={barData} 
                  title="Guest Categories Breakdown"
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: { callback: (value) => value.toLocaleString() }
                      }
                    },
                    plugins: {
                      tooltip: {
                        callbacks: {
                          label: (context) => `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`
                        }
                      }
                    }
                  }}
                />
              </div>
            )}
          </div>
        )}

        <div style={{ borderTop: '2px solid #e0e0e0', marginBottom: '32px' }}></div>

        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#333' }}>
          Guest Demographics Summary
        </h3>

        {/* Tables in 2 columns */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '24px',
          marginBottom: '32px'
        }}>
          
          {/* Annual Totals */}
          <div>
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '12px', color: 'var(--brand-primary)' }}>
              Annual Totals
            </h4>
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
            <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '12px', color: 'var(--brand-primary)' }}>
              Top Categories
            </h4>
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
        <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '12px', color: 'var(--brand-primary)' }}>
          Guest Categories Breakdown
        </h4>
        <div className="table-container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <table className="table-app">
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

    const incidentsData = getIncidentsBreakdownData(incidents);

    return (
      <div style={{ padding: '20px 0' }}>
        
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#333' }}>
          Incidents & Outreach Overview
        </h3>

        {/* Bar Chart */}
        {incidentsData && (
          <div style={{ 
            maxHeight: '300px',
            marginBottom: '48px',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
          }}>
            <BarChart 
              data={incidentsData} 
              title="Incidents & Outreach Breakdown"
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { callback: (value) => value.toLocaleString() }
                  }
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`
                    }
                  }
                }
              }}
            />
          </div>
        )}

        <div style={{ borderTop: '2px solid #e0e0e0', marginBottom: '32px' }}></div>

        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#333' }}>
          Incidents & Outreach Summary
        </h3>

        {/* Single centered table */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h4 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '12px', color: 'var(--brand-primary)' }}>
            Annual Summary
          </h4>
          <div className="table-container">
            <table className="table-app" style={{ fontSize: '0.95rem' }}>
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

    const summaryBarData = getWeeklySummaryBarData(summary);

    return (
      <div style={{ padding: '20px 0' }}>
        
        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#333' }}>
          Weekly Trends
        </h3>

        {/* Bar Chart */}
        {summaryBarData && (
          <div style={{ 
            maxHeight: '300px',
            marginBottom: '48px',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
          }}>
            <BarChart 
              data={summaryBarData} 
              title="Weekly Shelter Activity"
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { callback: (value) => value.toLocaleString() }
                  }
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`
                    }
                  }
                }
              }}
            />
          </div>
        )}

        <div style={{ borderTop: '2px solid #e0e0e0', marginBottom: '32px' }}></div>

        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '24px', color: '#333' }}>
          Weekly Shelter Data
        </h3>

        <div className="table-container" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <table className="table-app">
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
    <div className="hub-container">
      <div className="department-header">
        <h2>Shelter Reports</h2>
        <div className="department-actions">
          <Link to="/shelter">Data Entry</Link>
          <Link to="/shelter/reports" className="active">Reports</Link>
        </div>
      </div>

      {/* Year Selector and Tabs Row */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        
        {/* Tabs on Left */}
        <div style={{ 
          display: 'flex',
          gap: '8px',
          flex: '1 1 auto'
        }}>
          <button 
            className={`btn ${activeTab === "guests" ? "btn-primary" : ""}`}
            onClick={() => setActiveTab("guests")}
            style={{ padding: '8px 16px' }}
          >
            Guest Breakdown
          </button>
          <button 
            className={`btn ${activeTab === "incidents" ? "btn-primary" : ""}`}
            onClick={() => setActiveTab("incidents")}
            style={{ padding: '8px 16px' }}
          >
            Incidents & Outreach
          </button>
          <button 
            className={`btn ${activeTab === "summary" ? "btn-primary" : ""}`}
            onClick={() => setActiveTab("summary")}
            style={{ padding: '8px 16px' }}
          >
            Weekly Summary
          </button>
        </div>

        {/* Year Selector on Right */}
        <div style={{ flexShrink: 0 }}>
          <label style={{ marginRight: '8px', fontWeight: '500' }}>Year:</label>
          <select 
            value={year} 
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="form-select"
            style={{ display: 'inline-block', width: 'auto', padding: '6px 10px' }}
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>
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
