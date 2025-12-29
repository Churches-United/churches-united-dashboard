import { useEffect, useState } from "react";
import useStore from "../../zustand/store";

function ComplianceReporting() {
    console.log('🎯 ComplianceReporting component mounted');

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

  if (loading) return <p>⏳ Loading reports...</p>;
  if (error) return <p style={{ color: 'red' }}>❌ Error: {error}</p>;

  // Render Dashboard Tab
  const renderDashboard = () => {
    if (!dashboard) return <p>No dashboard data available</p>;
    
    const { current_year_totals, year_over_year_comparison, latest_week_data } = dashboard;
    
    return (
      <div>
        <h3>Dashboard Overview</h3>
        
        <fieldset>
          <legend>Current Year Totals</legend>
          <table border="1">
            <tbody>
              <tr>
                <td><strong>Total Households:</strong></td>
                <td>{current_year_totals?.total_households?.toLocaleString() || 0}</td>
              </tr>
              <tr>
                <td><strong>Total Individuals:</strong></td>
                <td>{current_year_totals?.total_individuals?.toLocaleString() || 0}</td>
              </tr>
              <tr>
                <td><strong>Total Exits:</strong></td>
                <td>{current_year_totals?.total_exits?.toLocaleString() || 0}</td>
              </tr>
              <tr>
                <td><strong>Avg Households/Week:</strong></td>
                <td>{current_year_totals?.avg_households_per_week || 0}</td>
              </tr>
              <tr>
                <td><strong>Avg Individuals/Week:</strong></td>
                <td>{current_year_totals?.avg_individuals_per_week || 0}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        <fieldset>
          <legend>Year-over-Year</legend>
          <table border="1">
            <tbody>
              <tr>
                <td><strong>Households:</strong></td>
                <td>
                  {year_over_year_comparison?.households_yoy_change > 0 ? '↑' : '↓'} 
                  {Math.abs(year_over_year_comparison?.households_yoy_change || 0).toLocaleString()}
                  {year_over_year_comparison?.households_yoy_pct && ` (${year_over_year_comparison.households_yoy_pct}%)`}
                </td>
              </tr>
              <tr>
                <td><strong>Individuals:</strong></td>
                <td>
                  {year_over_year_comparison?.individuals_yoy_change > 0 ? '↑' : '↓'} 
                  {Math.abs(year_over_year_comparison?.individuals_yoy_change || 0).toLocaleString()}
                  {year_over_year_comparison?.individuals_yoy_pct && ` (${year_over_year_comparison.individuals_yoy_pct}%)`}
                </td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        <fieldset>
          <legend>Latest Week ({latest_week_data?.date ? new Date(latest_week_data.date).toLocaleDateString() : 'N/A'})</legend>
          <table border="1">
            <tbody>
              <tr>
                <td><strong>Households:</strong></td>
                <td>{latest_week_data?.households || 0}</td>
              </tr>
              <tr>
                <td><strong>Individuals:</strong></td>
                <td>{latest_week_data?.individuals || 0}</td>
              </tr>
              <tr>
                <td><strong>Exits:</strong></td>
                <td>{latest_week_data?.exits || 0}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
    );
  };

  // Render Monthly Tab
  const renderMonthly = () => {
    if (!monthlyReport || monthlyReport.length === 0) return <p>No monthly data available</p>;

    return (
      <div>
        <h3>Monthly Report</h3>
        <table border="1">
          <thead>
            <tr>
              <th>Month</th>
              <th>Households</th>
              <th>Individuals</th>
              <th>Exits</th>
              <th>Avg HH/Week</th>
              <th>Avg Indiv/Week</th>
              <th>Weeks</th>
            </tr>
          </thead>
          <tbody>
            {monthlyReport.map((month) => (
              <tr key={month.month}>
                <td>{month.month_name?.trim() || 'N/A'}</td>
                <td>{month.total_households?.toLocaleString() || 0}</td>
                <td>{month.total_individuals?.toLocaleString() || 0}</td>
                <td>{month.total_exits?.toLocaleString() || 0}</td>
                <td>{month.avg_households_per_week || 0}</td>
                <td>{month.avg_individuals_per_week || 0}</td>
                <td>{month.weeks_in_month || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render Yearly Tab
  const renderYearly = () => {
    if (!yearlyReport) return <p>No yearly data available</p>;

    return (
      <div>
        <h3>Annual Summary</h3>
        
        <fieldset>
          <legend>Annual Totals</legend>
          <table border="1">
            <tbody>
              <tr>
                <td><strong>Total Households:</strong></td>
                <td>{yearlyReport.annual_total_households?.toLocaleString() || 0}</td>
              </tr>
              <tr>
                <td><strong>Total Individuals:</strong></td>
                <td>{yearlyReport.annual_total_individuals?.toLocaleString() || 0}</td>
              </tr>
              <tr>
                <td><strong>Total Exits:</strong></td>
                <td>{yearlyReport.annual_total_exits?.toLocaleString() || 0}</td>
              </tr>
              <tr>
                <td><strong>Weeks Reported:</strong></td>
                <td>{yearlyReport.total_weeks_reported || 0}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        <fieldset>
          <legend>Age Demographics</legend>
          <table border="1">
            <thead>
              <tr>
                <th>Category</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Adults</td>
                <td>{yearlyReport.annual_adults?.toLocaleString() || 0}</td>
                <td>{yearlyReport.pct_adults || 0}%</td>
              </tr>
              <tr>
                <td>Children</td>
                <td>{yearlyReport.annual_children?.toLocaleString() || 0}</td>
                <td>{yearlyReport.pct_children || 0}%</td>
              </tr>
              <tr>
                <td>Seniors (55+)</td>
                <td>{yearlyReport.annual_seniors?.toLocaleString() || 0}</td>
                <td>{yearlyReport.pct_seniors || 0}%</td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        <fieldset>
          <legend>Gender Demographics</legend>
          <table border="1">
            <thead>
              <tr>
                <th>Gender</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Female</td>
                <td>{yearlyReport.annual_female?.toLocaleString() || 0}</td>
                <td>{yearlyReport.pct_female || 0}%</td>
              </tr>
              <tr>
                <td>Male</td>
                <td>{yearlyReport.annual_male?.toLocaleString() || 0}</td>
                <td>{yearlyReport.pct_male || 0}%</td>
              </tr>
              <tr>
                <td>Other</td>
                <td>{yearlyReport.annual_other_gender?.toLocaleString() || 0}</td>
                <td>{yearlyReport.pct_other_gender || 0}%</td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
    );
  };

  // Render Demographics Tab
  const renderDemographics = () => {
    if (!demographics) return <p>No demographics data available</p>;

    return (
      <div>
        <h3>Demographics Deep Dive</h3>
        
        <fieldset>
          <legend>Age Breakdown</legend>
          <table border="1">
            <thead>
              <tr>
                <th>Age Group</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Adults</td>
                <td>{demographics.age_breakdown?.adults?.toLocaleString() || 0}</td>
                <td>{demographics.age_breakdown?.pct_adults || 0}%</td>
              </tr>
              <tr>
                <td>Children</td>
                <td>{demographics.age_breakdown?.children?.toLocaleString() || 0}</td>
                <td>{demographics.age_breakdown?.pct_children || 0}%</td>
              </tr>
              <tr>
                <td>Seniors (55+)</td>
                <td>{demographics.age_breakdown?.seniors?.toLocaleString() || 0}</td>
                <td>{demographics.age_breakdown?.pct_seniors || 0}%</td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        <fieldset>
          <legend>Race Breakdown</legend>
          <table border="1">
            <thead>
              <tr>
                <th>Race</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>White</td>
                <td>{demographics.race_breakdown?.white?.toLocaleString() || 0}</td>
                <td>{demographics.race_breakdown?.pct_white || 0}%</td>
              </tr>
              <tr>
                <td>Black/African American</td>
                <td>{demographics.race_breakdown?.black_african_american?.toLocaleString() || 0}</td>
                <td>{demographics.race_breakdown?.pct_black_african_american || 0}%</td>
              </tr>
              <tr>
                <td>Native American</td>
                <td>{demographics.race_breakdown?.native_american?.toLocaleString() || 0}</td>
                <td>{demographics.race_breakdown?.pct_native_american || 0}%</td>
              </tr>
              <tr>
                <td>Other</td>
                <td>{demographics.race_breakdown?.other_race?.toLocaleString() || 0}</td>
                <td>{demographics.race_breakdown?.pct_other_race || 0}%</td>
              </tr>
              <tr>
                <td>Multi-racial</td>
                <td>{demographics.race_breakdown?.multi_racial?.toLocaleString() || 0}</td>
                <td>{demographics.race_breakdown?.pct_multi_racial || 0}%</td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        <fieldset>
          <legend>Household Types</legend>
          <table border="1">
            <thead>
              <tr>
                <th>Type</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Without Children</td>
                <td>{demographics.household_types?.without_children?.toLocaleString() || 0}</td>
                <td>{demographics.household_types?.pct_without_children || 0}%</td>
              </tr>
              <tr>
                <td>With Children</td>
                <td>{demographics.household_types?.with_children?.toLocaleString() || 0}</td>
                <td>{demographics.household_types?.pct_with_children || 0}%</td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
    );
  };

  return (
    <div>
      <h2>Compliance Reports - {year}</h2>

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
        <button onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button onClick={() => setActiveTab("monthly")}>Monthly</button>
        <button onClick={() => setActiveTab("yearly")}>Yearly</button>
        <button onClick={() => setActiveTab("demographics")}>Demographics</button>
      </div>

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