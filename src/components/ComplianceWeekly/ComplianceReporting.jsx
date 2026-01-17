import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useStore from "../../zustand/store";
import '../../styles/tables.css';
import './ComplianceWeekly.css';

// Import chart components
import LineChart from "../Charts/LineChart";
import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";

function ComplianceReporting() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [year, setYear] = useState(2025);

  // Get all reports data from store
  const dashboard = useStore((state) => state.complianceReports.dashboard);
  const monthlyReport = useStore((state) => state.complianceReports.monthlyReport);
  const yearlyReport = useStore((state) => state.complianceReports.yearlyReport);
  const demographics = useStore((state) => state.complianceReports.demographics);
  const loading = useStore((state) => state.complianceReports.loading);
  const error = useStore((state) => state.complianceReports.error);

  // Get fetch actions
  const fetchDashboard = useStore((state) => state.fetchComplianceDashboard);
  const fetchMonthlyReport = useStore((state) => state.fetchComplianceMonthlyReport);
  const fetchYearlyReport = useStore((state) => state.fetchComplianceYearlyReport);
  const fetchDemographics = useStore((state) => state.fetchComplianceDemographics);

  // Fetch data when tab or year changes
  useEffect(() => {
    if (activeTab === "dashboard") fetchDashboard(year);
    if (activeTab === "monthly") fetchMonthlyReport(year);
    if (activeTab === "yearly") fetchYearlyReport(year);
    if (activeTab === "demographics") fetchDemographics(year);
  }, [activeTab, year, fetchDashboard, fetchMonthlyReport, fetchYearlyReport, fetchDemographics]);

  if (loading) return <div className="table-loading">Loading...</div>;
  if (error) return <div className="table-error">Error: {error}</div>;

  // ========== CHART DATA FUNCTIONS ==========

  // Age Breakdown Pie Chart
  const getAgeBreakdownData = () => {
    if (!demographics?.age_breakdown) return null;

    return {
      labels: ['Adults', 'Children', 'Seniors 55+'],
      datasets: [{
        data: [
          demographics.age_breakdown.adults || 0,
          demographics.age_breakdown.children || 0,
          demographics.age_breakdown.seniors || 0
        ],
        backgroundColor: ['#36a2eb', '#ff6384', '#ffce56'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    };
  };

  // Gender Breakdown Pie Chart
  const getGenderBreakdownData = () => {
    if (!yearlyReport) return null;

    return {
      labels: ['Female', 'Male', 'Other'],
      datasets: [{
        data: [
          yearlyReport.annual_female || 0,
          yearlyReport.annual_male || 0,
          yearlyReport.annual_other_gender || 0
        ],
        backgroundColor: ['#ff6384', '#36a2eb', '#4bc0c0'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    };
  };

  // Race Breakdown Bar Chart
  const getRaceBreakdownData = () => {
    if (!demographics?.race_breakdown) return null;

    return {
      labels: ['White', 'Black/African American', 'Native American', 'Other', 'Multi-racial'],
      datasets: [{
        label: 'Count',
        data: [
          demographics.race_breakdown.white || 0,
          demographics.race_breakdown.black_african_american || 0,
          demographics.race_breakdown.native_american || 0,
          demographics.race_breakdown.other_race || 0,
          demographics.race_breakdown.multi_racial || 0
        ],
        backgroundColor: ['#36a2eb', '#ff6384', '#ffce56', '#4bc0c0', '#9966ff'],
        borderWidth: 1,
        borderColor: '#fff'
      }]
    };
  };

  // Monthly Trends Line Chart
  const getMonthlyTrendsData = () => {
    if (!monthlyReport || monthlyReport.length === 0) return null;

    return {
      labels: monthlyReport.map(m => m.month_name?.trim() || 'N/A'),
      datasets: [
        {
          label: 'Households',
          data: monthlyReport.map(m => m.total_households || 0),
          borderColor: '#36a2eb',
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Individuals',
          data: monthlyReport.map(m => m.total_individuals || 0),
          borderColor: '#ff6384',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Exits',
          data: monthlyReport.map(m => m.total_exits || 0),
          borderColor: '#ffce56',
          backgroundColor: 'rgba(255, 206, 86, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  };

  // ========== DASHBOARD TAB RENDER ==========
  
  const renderDashboard = () => {
    if (!dashboard) {
      return (
        <div className="table-empty">
          <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.4 }}>📊</div>
          <p>No dashboard data available for {year}</p>
        </div>
      );
    }
    
    const { current_year_totals, year_over_year_comparison, latest_week_data } = dashboard;

    const ageChartData = getAgeBreakdownData();
    const genderChartData = getGenderBreakdownData();
    
    return (
      <div style={{ padding: '20px 0' }}>
        
        {/* Charts Section Header */}
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Compliance Overview
        </h3>

        {/* Charts - Side by Side */}
        {(ageChartData || genderChartData) && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
            gap: '24px',
            marginBottom: '48px'
          }}>
            {ageChartData && (
              <div style={{ 
                maxHeight: '280px',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
              }}>
                <PieChart 
                  data={ageChartData} 
                  title="Age Breakdown"
                />
              </div>
            )}
            
            {genderChartData && (
              <div style={{ 
                maxHeight: '280px',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
              }}>
                <PieChart 
                  data={genderChartData} 
                  title="Gender Breakdown"
                />
              </div>
            )}
          </div>
        )}

        {/* Divider Line */}
        <div style={{
          borderTop: '2px solid #e0e0e0',
          marginBottom: '32px'
        }}></div>

        {/* Summary Tables */}
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Key Metrics Summary
        </h3>

        {/* Tables in 3 columns */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '24px'
        }}>
          
          {/* Current Year Totals */}
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '12px',
              color: 'var(--brand-primary)'
            }}>
              Current Year Totals
            </h4>
            <div className="table-container">
              <table className="table-app" style={{ fontSize: '0.875rem' }}>
                <tbody>
                  <tr>
                    <td>Total Households:</td>
                    <td className="col-number" style={{ fontWeight: 'bold', color: 'var(--brand-primary)' }}>
                      {current_year_totals?.total_households?.toLocaleString() || 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Individuals:</td>
                    <td className="col-number" style={{ fontWeight: 'bold', color: 'var(--brand-primary)' }}>
                      {current_year_totals?.total_individuals?.toLocaleString() || 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Exits:</td>
                    <td className="col-number">{current_year_totals?.total_exits?.toLocaleString() || 0}</td>
                  </tr>
                  <tr>
                    <td>Avg Households/Week:</td>
                    <td className="col-number">{current_year_totals?.avg_households_per_week || 0}</td>
                  </tr>
                  <tr>
                    <td>Avg Individuals/Week:</td>
                    <td className="col-number">{current_year_totals?.avg_individuals_per_week || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Year-over-Year */}
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '12px',
              color: 'var(--brand-primary)'
            }}>
              Year-over-Year Comparison
            </h4>
            <div className="table-container">
              <table className="table-app" style={{ fontSize: '0.875rem' }}>
                <tbody>
                  <tr>
                    <td>Households Change:</td>
                    <td className="col-number" style={{ 
                      color: (year_over_year_comparison?.households_yoy_change || 0) >= 0 ? 'green' : 'red' 
                    }}>
                      {(year_over_year_comparison?.households_yoy_change || 0) >= 0 ? '↑' : '↓'} 
                      {Math.abs(year_over_year_comparison?.households_yoy_change || 0).toLocaleString()}
                      {year_over_year_comparison?.households_yoy_pct && ` (${year_over_year_comparison.households_yoy_pct}%)`}
                    </td>
                  </tr>
                  <tr>
                    <td>Individuals Change:</td>
                    <td className="col-number" style={{ 
                      color: (year_over_year_comparison?.individuals_yoy_change || 0) >= 0 ? 'green' : 'red' 
                    }}>
                      {(year_over_year_comparison?.individuals_yoy_change || 0) >= 0 ? '↑' : '↓'} 
                      {Math.abs(year_over_year_comparison?.individuals_yoy_change || 0).toLocaleString()}
                      {year_over_year_comparison?.individuals_yoy_pct && ` (${year_over_year_comparison.individuals_yoy_pct}%)`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Latest Week */}
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '12px',
              color: 'var(--brand-primary)'
            }}>
              Latest Week ({latest_week_data?.date ? new Date(latest_week_data.date).toLocaleDateString() : 'N/A'})
            </h4>
            <div className="table-container">
              <table className="table-app" style={{ fontSize: '0.875rem' }}>
                <tbody>
                  <tr>
                    <td>Households:</td>
                    <td className="col-number">{latest_week_data?.households || 0}</td>
                  </tr>
                  <tr>
                    <td>Individuals:</td>
                    <td className="col-number">{latest_week_data?.individuals || 0}</td>
                  </tr>
                  <tr>
                    <td>Exits:</td>
                    <td className="col-number">{latest_week_data?.exits || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ========== MONTHLY TAB RENDER ==========
  
  const renderMonthly = () => {
    if (!monthlyReport || monthlyReport.length === 0) {
      return (
        <div className="table-empty">
          <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.4 }}>📅</div>
          <p>No monthly data available for {year}</p>
        </div>
      );
    }

    const trendsData = getMonthlyTrendsData();

    return (
      <div style={{ padding: '20px 0' }}>
        
        {/* Chart Section Header */}
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Monthly Trends
        </h3>

        {/* Line Chart */}
        {trendsData && (
          <div style={{ 
            maxHeight: '300px',
            marginBottom: '48px',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
          }}>
            <LineChart 
              data={trendsData} 
              title="Monthly Trends Over Time"
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return value.toLocaleString();
                      }
                    }
                  }
                },
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        )}

        {/* Divider Line */}
        <div style={{
          borderTop: '2px solid #e0e0e0',
          marginBottom: '32px'
        }}></div>

        {/* Table Section Header */}
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Monthly Data Details
        </h3>

        {/* Monthly Data Table */}
        <div className="table-container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <table className="table-app table-hover table-striped">
            <thead>
              <tr>
                <th>Month</th>
                <th className="col-number">Households</th>
                <th className="col-number">Individuals</th>
                <th className="col-number">Exits</th>
                <th className="col-number">Avg HH/Week</th>
                <th className="col-number">Avg Indiv/Week</th>
                <th className="col-number">Weeks</th>
              </tr>
            </thead>
            <tbody>
              {monthlyReport.map((month) => (
                <tr key={month.month}>
                  <td>{month.month_name?.trim() || 'N/A'}</td>
                  <td className="col-number">{month.total_households?.toLocaleString() || 0}</td>
                  <td className="col-number">{month.total_individuals?.toLocaleString() || 0}</td>
                  <td className="col-number">{month.total_exits?.toLocaleString() || 0}</td>
                  <td className="col-number">{month.avg_households_per_week || 0}</td>
                  <td className="col-number">{month.avg_individuals_per_week || 0}</td>
                  <td className="col-number">{month.weeks_in_month || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ========== YEARLY TAB RENDER ==========
  
  const renderYearly = () => {
    if (!yearlyReport) {
      return (
        <div className="table-empty">
          <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.4 }}>📊</div>
          <p>No yearly data available for {year}</p>
        </div>
      );
    }

    const ageData = getAgeBreakdownData();
    const genderData = getGenderBreakdownData();

    return (
      <div style={{ padding: '20px 0' }}>
        
        {/* Charts Section */}
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Annual Demographics
        </h3>

        {/* Charts - Side by Side */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
          gap: '24px',
          marginBottom: '48px'
        }}>
          {ageData && (
            <div style={{ 
              maxHeight: '280px',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
            }}>
              <PieChart 
                data={ageData} 
                title="Age Distribution"
              />
            </div>
          )}
          
          {genderData && (
            <div style={{ 
              maxHeight: '280px',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
            }}>
              <PieChart 
                data={genderData} 
                title="Gender Distribution"
              />
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{
          borderTop: '2px solid #e0e0e0',
          marginBottom: '32px'
        }}></div>

        {/* Summary Tables */}
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Annual Summary
        </h3>

        {/* Tables in 3 columns */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '24px'
        }}>
          
          {/* Annual Totals */}
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '12px',
              color: 'var(--brand-primary)'
            }}>
              Annual Totals
            </h4>
            <div className="table-container">
              <table className="table-app" style={{ fontSize: '0.875rem' }}>
                <tbody>
                  <tr>
                    <td>Total Households:</td>
                    <td className="col-number" style={{ fontWeight: 'bold' }}>
                      {yearlyReport.annual_total_households?.toLocaleString() || 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Individuals:</td>
                    <td className="col-number" style={{ fontWeight: 'bold' }}>
                      {yearlyReport.annual_total_individuals?.toLocaleString() || 0}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Exits:</td>
                    <td className="col-number">{yearlyReport.annual_total_exits?.toLocaleString() || 0}</td>
                  </tr>
                  <tr>
                    <td>Weeks Reported:</td>
                    <td className="col-number">{yearlyReport.total_weeks_reported || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Age Demographics Table */}
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '12px',
              color: 'var(--brand-primary)'
            }}>
              Age Demographics
            </h4>
            <div className="table-container">
              <table className="table-app" style={{ fontSize: '0.875rem' }}>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th className="col-number">Count</th>
                    <th className="col-number">%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Adults</td>
                    <td className="col-number">{yearlyReport.annual_adults?.toLocaleString() || 0}</td>
                    <td className="col-number">{yearlyReport.pct_adults || 0}%</td>
                  </tr>
                  <tr>
                    <td>Children</td>
                    <td className="col-number">{yearlyReport.annual_children?.toLocaleString() || 0}</td>
                    <td className="col-number">{yearlyReport.pct_children || 0}%</td>
                  </tr>
                  <tr>
                    <td>Seniors 55+</td>
                    <td className="col-number">{yearlyReport.annual_seniors?.toLocaleString() || 0}</td>
                    <td className="col-number">{yearlyReport.pct_seniors || 0}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Gender Demographics Table */}
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '12px',
              color: 'var(--brand-primary)'
            }}>
              Gender Demographics
            </h4>
            <div className="table-container">
              <table className="table-app" style={{ fontSize: '0.875rem' }}>
                <thead>
                  <tr>
                    <th>Gender</th>
                    <th className="col-number">Count</th>
                    <th className="col-number">%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Female</td>
                    <td className="col-number">{yearlyReport.annual_female?.toLocaleString() || 0}</td>
                    <td className="col-number">{yearlyReport.pct_female || 0}%</td>
                  </tr>
                  <tr>
                    <td>Male</td>
                    <td className="col-number">{yearlyReport.annual_male?.toLocaleString() || 0}</td>
                    <td className="col-number">{yearlyReport.pct_male || 0}%</td>
                  </tr>
                  <tr>
                    <td>Other</td>
                    <td className="col-number">{yearlyReport.annual_other_gender?.toLocaleString() || 0}</td>
                    <td className="col-number">{yearlyReport.pct_other_gender || 0}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ========== DEMOGRAPHICS TAB RENDER ==========
  
  const renderDemographics = () => {
    if (!demographics) {
      return (
        <div className="table-empty">
          <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.4 }}>👥</div>
          <p>No demographics data available for {year}</p>
        </div>
      );
    }

    const raceData = getRaceBreakdownData();
    const ageData = getAgeBreakdownData();

    return (
      <div style={{ padding: '20px 0' }}>
        
        {/* Charts Section */}
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Demographics Breakdown
        </h3>

        {/* Charts Grid */}
        <div style={{ marginBottom: '48px' }}>
          
          {/* Age Pie Chart */}
          {ageData && (
            <div style={{ 
              maxHeight: '280px',
              marginBottom: '24px',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
              maxWidth: '600px',
              margin: '0 auto 24px'
            }}>
              <PieChart 
                data={ageData} 
                title="Age Distribution"
              />
            </div>
          )}

          {/* Race Bar Chart */}
          {raceData && (
            <div style={{ 
              maxHeight: '300px',
              marginBottom: '24px',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
            }}>
              <BarChart 
                data={raceData} 
                title="Race/Ethnicity Breakdown"
                options={{
                  indexAxis: 'y',
                  scales: {
                    x: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return value.toLocaleString();
                        }
                      }
                    }
                  },
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `Count: ${context.parsed.x.toLocaleString()}`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{
          borderTop: '2px solid #e0e0e0',
          marginBottom: '32px'
        }}></div>

        {/* Detailed Tables */}
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Detailed Demographics
        </h3>

        {/* Tables Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '24px'
        }}>
          
          {/* Age Breakdown Table */}
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '12px',
              color: 'var(--brand-primary)'
            }}>
              Age Breakdown
            </h4>
            <div className="table-container">
              <table className="table-app table-hover">
                <thead>
                  <tr>
                    <th>Age Group</th>
                    <th className="col-number">Count</th>
                    <th className="col-number">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Adults</td>
                    <td className="col-number">{demographics.age_breakdown?.adults?.toLocaleString() || 0}</td>
                    <td className="col-number">{demographics.age_breakdown?.pct_adults || 0}%</td>
                  </tr>
                  <tr>
                    <td>Children</td>
                    <td className="col-number">{demographics.age_breakdown?.children?.toLocaleString() || 0}</td>
                    <td className="col-number">{demographics.age_breakdown?.pct_children || 0}%</td>
                  </tr>
                  <tr>
                    <td>Seniors (55+)</td>
                    <td className="col-number">{demographics.age_breakdown?.seniors?.toLocaleString() || 0}</td>
                    <td className="col-number">{demographics.age_breakdown?.pct_seniors || 0}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Race Breakdown Table */}
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '12px',
              color: 'var(--brand-primary)'
            }}>
              Race Breakdown
            </h4>
            <div className="table-container">
              <table className="table-app table-hover">
                <thead>
                  <tr>
                    <th>Race</th>
                    <th className="col-number">Count</th>
                    <th className="col-number">%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>White</td>
                    <td className="col-number">{demographics.race_breakdown?.white?.toLocaleString() || 0}</td>
                    <td className="col-number">{demographics.race_breakdown?.pct_white || 0}%</td>
                  </tr>
                  <tr>
                    <td>Black/African American</td>
                    <td className="col-number">{demographics.race_breakdown?.black_african_american?.toLocaleString() || 0}</td>
                    <td className="col-number">{demographics.race_breakdown?.pct_black_african_american || 0}%</td>
                  </tr>
                  <tr>
                    <td>Native American</td>
                    <td className="col-number">{demographics.race_breakdown?.native_american?.toLocaleString() || 0}</td>
                    <td className="col-number">{demographics.race_breakdown?.pct_native_american || 0}%</td>
                  </tr>
                  <tr>
                    <td>Other</td>
                    <td className="col-number">{demographics.race_breakdown?.other_race?.toLocaleString() || 0}</td>
                    <td className="col-number">{demographics.race_breakdown?.pct_other_race || 0}%</td>
                  </tr>
                  <tr>
                    <td>Multi-racial</td>
                    <td className="col-number">{demographics.race_breakdown?.multi_racial?.toLocaleString() || 0}</td>
                    <td className="col-number">{demographics.race_breakdown?.pct_multi_racial || 0}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Household Types Table */}
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '12px',
              color: 'var(--brand-primary)'
            }}>
              Household Types
            </h4>
            <div className="table-container">
              <table className="table-app table-hover">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th className="col-number">Count</th>
                    <th className="col-number">%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Without Children</td>
                    <td className="col-number">{demographics.household_types?.without_children?.toLocaleString() || 0}</td>
                    <td className="col-number">{demographics.household_types?.pct_without_children || 0}%</td>
                  </tr>
                  <tr>
                    <td>With Children</td>
                    <td className="col-number">{demographics.household_types?.with_children?.toLocaleString() || 0}</td>
                    <td className="col-number">{demographics.household_types?.pct_with_children || 0}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ========== MAIN RENDER ==========
  
  return (
    <div className="compliance-hub-container">
      <div className="compliance-department-header">
        <h2>Compliance Reports</h2>
        <div className="compliance-department-actions">
          <Link to="/compliance">Data Entry</Link>
          <Link to="/compliance/reports" className="active">Reports</Link>
        </div>
      </div>

      {/* Year Selector and Tabs Row */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        
        {/* Tabs on Left */}
        <div className="compliance-tabs-container" style={{ 
          flex: '1 1 auto',
          marginBottom: 0,
          borderBottom: 'none'
        }}>
          <button 
            className={`compliance-tab-button ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button 
            className={`compliance-tab-button ${activeTab === "monthly" ? "active" : ""}`}
            onClick={() => setActiveTab("monthly")}
          >
            Monthly
          </button>
          <button 
            className={`compliance-tab-button ${activeTab === "yearly" ? "active" : ""}`}
            onClick={() => setActiveTab("yearly")}
          >
            Yearly
          </button>
          <button 
            className={`compliance-tab-button ${activeTab === "demographics" ? "active" : ""}`}
            onClick={() => setActiveTab("demographics")}
          >
            Demographics
          </button>
        </div>

        {/* Year Selector on Right */}
        <div style={{ flexShrink: 0 }}>
          <label style={{ marginRight: '8px', fontWeight: '500', fontSize: '0.9rem' }}>Year:</label>
          <select 
            value={year} 
            onChange={(e) => setYear(parseInt(e.target.value))}
            style={{
              padding: '6px 10px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '0.9rem',
              minWidth: '100px'
            }}
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderBottom: '2px solid #e0e0e0', marginBottom: '24px' }}></div>

      {/* Tab Content */}
      <div>
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "monthly" && renderMonthly()}
        {activeTab === "yearly" && renderYearly()}
        {activeTab === "demographics" && renderDemographics()}
      </div>
    </div>
  );
}

export default ComplianceReporting;