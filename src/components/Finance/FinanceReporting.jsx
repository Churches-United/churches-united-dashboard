import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useStore from "../../zustand/store";
import '../../styles/tables.css';
import './Finance.css';

// Import chart components
import LineChart from "../Charts/LineChart";
import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";

function FinanceReporting() {
  const [activeTab, setActiveTab] = useState("metrics");
  const [year, setYear] = useState(2025);

  const summary = useStore((state) => state.financeReports?.summary);
  const metrics = useStore((state) => state.financeReports?.metrics);
  const cashflow = useStore((state) => state.financeReports?.cashflow);
  const loading = useStore((state) => state.financeReports?.loading);
  const error = useStore((state) => state.financeReports?.error);

  const fetchSummary = useStore((state) => state.fetchFinanceSummary);
  const fetchMetrics = useStore((state) => state.fetchFinanceMetrics);
  const fetchCashflow = useStore((state) => state.fetchFinanceCashflow);

  useEffect(() => {
    if (activeTab === "summary") fetchSummary(year);
    if (activeTab === "metrics") fetchMetrics(year);
    if (activeTab === "cashflow") fetchCashflow(year);
  }, [activeTab, year, fetchSummary, fetchMetrics, fetchCashflow]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US');
  };

  // ========== METRICS TAB CHART DATA ==========
  
  const getExpenseBreakdownChartData = () => {
    if (!metrics) return null;

    const billsPaid = parseFloat(metrics.total_bills) || 0;
    const payroll = parseFloat(metrics.total_payroll) || 0;

    if (billsPaid === 0 && payroll === 0) return null;

    return {
      labels: ['Bills Paid', 'Payroll'],
      datasets: [{
        data: [billsPaid, payroll],
        backgroundColor: ['#ff6384', '#36a2eb'],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    };
  };

  const getWeeklyAveragesChartData = () => {
    if (!metrics) return null;

    return {
      labels: ['Revenue', 'Bills', 'Payroll'],
      datasets: [{
        label: 'Weekly Average ($)',
        data: [
          parseFloat(metrics.avg_weekly_revenue) || 0,
          parseFloat(metrics.avg_weekly_bills) || 0,
          parseFloat(metrics.avg_weekly_payroll) || 0
        ],
        backgroundColor: ['#28a745', '#ffc107', '#dc3545'],
        borderWidth: 1,
        borderColor: '#fff'
      }]
    };
  };

  // ========== CASHFLOW TAB CHART DATA ==========
  
  const getCashFlowChartData = () => {
    if (!cashflow || cashflow.length === 0) return null;

    return {
      labels: cashflow.map(w => {
        const date = new Date(w.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      datasets: [
        {
          label: 'Revenue',
          data: cashflow.map(w => parseFloat(w.revenue_received) || 0),
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Total Expenses',
          data: cashflow.map(w => parseFloat(w.total_expenses) || 0),
          borderColor: '#dc3545',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Net Change',
          data: cashflow.map(w => parseFloat(w.net_change) || 0),
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  };

  // ========== SUMMARY TAB CHART DATA ==========
  
  const getRevenueVsExpensesData = () => {
    if (!summary || summary.length === 0) return null;

    return {
      labels: summary.map(w => {
        const date = new Date(w.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      datasets: [
        {
          label: 'Revenue',
          data: summary.map(w => parseFloat(w.revenue_received) || 0),
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Bills',
          data: summary.map(w => parseFloat(w.bills_paid) || 0),
          borderColor: '#dc3545',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Payroll',
          data: summary.map(w => parseFloat(w.payroll_paid) || 0),
          borderColor: '#ffc107',
          backgroundColor: 'rgba(255, 193, 7, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    };
  };

  const getNetChangeData = () => {
    if (!summary || summary.length === 0) return null;

    return {
      labels: summary.map(w => {
        const date = new Date(w.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      datasets: [{
        label: 'Net Change ($)',
        data: summary.map(w => parseFloat(w.net_change) || 0),
        backgroundColor: summary.map(w => 
          (parseFloat(w.net_change) || 0) >= 0 ? '#28a745' : '#dc3545'
        ),
        borderWidth: 1,
        borderColor: '#fff'
      }]
    };
  };

  const getOperatingBalanceData = () => {
    if (!summary || summary.length === 0) return null;

    return {
      labels: summary.map(w => {
        const date = new Date(w.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      datasets: [{
        label: 'Operating Balance',
        data: summary.map(w => parseFloat(w.operating_account_balance) || 0),
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#007bff'
      }]
    };
  };

  const getTotalAssetsData = () => {
    if (!summary || summary.length === 0) return null;

    return {
      labels: summary.map(w => {
        const date = new Date(w.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      datasets: [{
        label: 'Total Assets',
        data: summary.map(w => parseFloat(w.total_assets) || 0),
        borderColor: '#6f42c1',
        backgroundColor: 'rgba(111, 66, 193, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: '#6f42c1'
      }]
    };
  };

  // ========== LOADING & ERROR STATES ==========
  
  if (loading) return <div className="table-loading">Loading...</div>;
  if (error) return <div className="table-error">Error: {error}</div>;

  // ========== METRICS TAB RENDER ==========
  
  const renderMetrics = () => {
    if (!metrics) {
      return (
        <div className="table-empty">
          <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.4 }}>📊</div>
          <p>No metrics data available for {year}</p>
        </div>
      );
    }

    const expenseChartData = getExpenseBreakdownChartData();
    const weeklyAvgChartData = getWeeklyAveragesChartData();

    return (
      <div style={{ padding: '20px 0' }}>
        
        {/* Charts Section Header */}
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Financial Overview
        </h3>
        
        {/* Charts Section - Side by Side */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
          gap: '24px',
          marginBottom: '48px'
        }}>
          {weeklyAvgChartData && (
            <div style={{ 
              maxHeight: '280px',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
            }}>
              <BarChart 
                data={weeklyAvgChartData} 
                title="Weekly Averages"
              />
            </div>
          )}
          
          {expenseChartData && (
            <div style={{ 
              maxHeight: '280px',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
            }}>
              <PieChart 
                data={expenseChartData} 
                title="Expense Breakdown"
              />
            </div>
          )}
        </div>

        {/* Divider Line */}
        <div style={{
          borderTop: '2px solid #e0e0e0',
          marginBottom: '32px'
        }}></div>

        {/* Tables Section Header */}
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Financial Metrics Summary
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
                    <td>Total Revenue:</td>
                    <td className="col-number" style={{ color: 'green' }}>
                      {formatCurrency(metrics.total_revenue)}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Bills Paid:</td>
                    <td className="col-number" style={{ color: 'red' }}>
                      {formatCurrency(metrics.total_bills)}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Payroll:</td>
                    <td className="col-number" style={{ color: 'red' }}>
                      {formatCurrency(metrics.total_payroll)}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <td><strong>Net Change (Year):</strong></td>
                    <td className="col-number" style={{ 
                      color: metrics.net_change_year >= 0 ? 'green' : 'red',
                      fontWeight: 'bold'
                    }}>
                      {formatCurrency(metrics.net_change_year)}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Weeks Reported:</td>
                    <td className="col-number">{metrics.total_weeks || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Weekly Averages */}
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '12px',
              color: 'var(--brand-primary)'
            }}>
              Weekly Averages
            </h4>
            <div className="table-container">
              <table className="table-app" style={{ fontSize: '0.875rem' }}>
                <tbody>
                  <tr>
                    <td>Avg Weekly Revenue:</td>
                    <td className="col-number">{formatCurrency(metrics.avg_weekly_revenue)}</td>
                  </tr>
                  <tr>
                    <td>Avg Weekly Bills:</td>
                    <td className="col-number">{formatCurrency(metrics.avg_weekly_bills)}</td>
                  </tr>
                  <tr>
                    <td>Avg Weekly Payroll:</td>
                    <td className="col-number">{formatCurrency(metrics.avg_weekly_payroll)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Asset Positions */}
          <div>
            <h4 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '12px',
              color: 'var(--brand-primary)'
            }}>
              Asset Positions
            </h4>
            <div className="table-container">
              <table className="table-app" style={{ fontSize: '0.875rem' }}>
                <tbody>
                  <tr>
                    <td>Avg Total Assets:</td>
                    <td className="col-number">{formatCurrency(metrics.avg_assets)}</td>
                  </tr>
                  <tr>
                    <td>Max Total Assets:</td>
                    <td className="col-number">{formatCurrency(metrics.max_assets)}</td>
                  </tr>
                  <tr>
                    <td>Min Total Assets:</td>
                    <td className="col-number">{formatCurrency(metrics.min_assets)}</td>
                  </tr>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <td colSpan="2" style={{ paddingTop: '8px' }}></td>
                  </tr>
                  <tr>
                    <td>Avg Operating Balance:</td>
                    <td className="col-number">{formatCurrency(metrics.avg_operating_balance)}</td>
                  </tr>
                  <tr>
                    <td>Max Operating Balance:</td>
                    <td className="col-number">{formatCurrency(metrics.max_operating_balance)}</td>
                  </tr>
                  <tr>
                    <td>Min Operating Balance:</td>
                    <td className="col-number">{formatCurrency(metrics.min_operating_balance)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ========== CASHFLOW TAB RENDER ==========
  
  const renderCashflow = () => {
    if (!cashflow || cashflow.length === 0) {
      return (
        <div className="table-empty">
          <div style={{ fontSize: '3rem', marginBottom: '16px', opacity: 0.4 }}>💰</div>
          <p>No cash flow data available for {year}</p>
        </div>
      );
    }

    const chartData = getCashFlowChartData();

    return (
      <div style={{ padding: '20px 0' }}>
        
        {/* Chart Section Header */}
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Cash Flow Visualization
        </h3>
        
        {/* Line Chart */}
        {chartData && (
          <div style={{ 
            maxHeight: '300px',
            marginBottom: '48px',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
          }}>
            <LineChart 
              data={chartData} 
              title="Cash Flow Over Time"
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
          Weekly Cash Flow Data
        </h3>

        {/* Table */}
        <div className="table-container" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <table className="table-app table-hover table-striped">
            <thead>
              <tr>
                <th>Week Of</th>
                <th className="col-number">Revenue</th>
                <th className="col-number">Total Expenses</th>
                <th className="col-number">Net Change</th>
                <th className="col-number">Operating Balance</th>
              </tr>
            </thead>
            <tbody>
              {cashflow.map((week, index) => (
                <tr key={index}>
                  <td>{formatDate(week.date)}</td>
                  <td className="col-number" style={{ color: 'green' }}>
                    {formatCurrency(week.revenue_received)}
                  </td>
                  <td className="col-number" style={{ color: 'red' }}>
                    {formatCurrency(week.total_expenses)}
                  </td>
                  <td className="col-number" style={{ 
                    color: week.net_change >= 0 ? 'green' : 'red'
                  }}>
                    {formatCurrency(week.net_change)}
                  </td>
                  <td className="col-number">{formatCurrency(week.operating_account_balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
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

    const revenueVsExpensesData = getRevenueVsExpensesData();
    const netChangeData = getNetChangeData();
    const operatingBalanceData = getOperatingBalanceData();
    const totalAssetsData = getTotalAssetsData();

    return (
      <div style={{ padding: '20px 0' }}>
        
        {/* Charts Section Header */}
        <h3 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '24px',
          color: '#333'
        }}>
          Financial Trends
        </h3>
        
        {/* Charts Grid */}
        <div style={{ marginBottom: '48px' }}>
          
          {/* Chart 1: Revenue vs Expenses (Full Width) */}
          {revenueVsExpensesData && (
            <div style={{ 
              maxHeight: '300px',
              marginBottom: '24px',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
            }}>
              <LineChart 
                data={revenueVsExpensesData} 
                title="Revenue vs Expenses Over Time"
              />
            </div>
          )}

          {/* Two Column Layout for smaller charts */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', 
            gap: '24px',
            marginBottom: '24px'
          }}>
            {/* Chart 2: Net Change */}
            {netChangeData && (
              <div style={{ 
                maxHeight: '280px',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
              }}>
                <BarChart 
                  data={netChangeData} 
                  title="Weekly Net Change"
                />
              </div>
            )}

            {/* Chart 3: Operating Balance */}
            {operatingBalanceData && (
              <div style={{ 
                maxHeight: '280px',
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
              }}>
                <LineChart 
                  data={operatingBalanceData} 
                  title="Operating Balance Trend"
                />
              </div>
            )}
          </div>

          {/* Chart 4: Total Assets (Full Width) */}
          {totalAssetsData && (
            <div style={{ 
              maxHeight: '300px',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
            }}>
              <LineChart 
                data={totalAssetsData} 
                title="Total Assets Over Time"
              />
            </div>
          )}
        </div>

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
          Detailed Weekly Data
        </h3>

        {/* Data Table */}
        <div className="table-container" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <table className="table-app table-hover table-striped">
            <thead>
              <tr>
                <th>Week Of</th>
                <th className="col-number">Total Assets</th>
                <th className="col-number">Operating Balance</th>
                <th className="col-number">Revenue</th>
                <th className="col-number">Bills Paid</th>
                <th className="col-number">Payroll</th>
                <th className="col-number">Net Change</th>
                <th>Major Expenses</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((week, index) => (
                <tr key={index}>
                  <td>{formatDate(week.date)}</td>
                  <td className="col-number">{formatCurrency(week.total_assets)}</td>
                  <td className="col-number">{formatCurrency(week.operating_account_balance)}</td>
                  <td className="col-number" style={{ color: 'green' }}>
                    {formatCurrency(week.revenue_received)}
                  </td>
                  <td className="col-number" style={{ color: 'red' }}>
                    {formatCurrency(week.bills_paid)}
                  </td>
                  <td className="col-number" style={{ color: 'red' }}>
                    {formatCurrency(week.payroll_paid)}
                  </td>
                  <td className="col-number" style={{ 
                    color: week.net_change >= 0 ? 'green' : 'red'
                  }}>
                    {formatCurrency(week.net_change)}
                  </td>
                  <td>{week.major_expenses || '—'}</td>
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
    <div className="finance-hub-container">
      <div className="finance-department-header">
        <h2>Finance Reports - {year}</h2>
        <div className="finance-department-actions">
          <Link to="/finance">Data Entry</Link>
          <Link to="/finance/reports" className="active">Reports</Link>
        </div>
      </div>

      <div className="finance-year-selector">
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

      <div className="finance-tabs-container">
        <button 
          className={`finance-tab-button ${activeTab === "metrics" ? "active" : ""}`}
          onClick={() => setActiveTab("metrics")}
        >
          Financial Metrics
        </button>
        <button 
          className={`finance-tab-button ${activeTab === "cashflow" ? "active" : ""}`}
          onClick={() => setActiveTab("cashflow")}
        >
          Cash Flow
        </button>
        <button 
          className={`finance-tab-button ${activeTab === "summary" ? "active" : ""}`}
          onClick={() => setActiveTab("summary")}
        >
          Weekly Summary
        </button>
      </div>

      <div>
        {activeTab === "metrics" && renderMetrics()}
        {activeTab === "cashflow" && renderCashflow()}
        {activeTab === "summary" && renderSummary()}
      </div>
    </div>
  );
}

export default FinanceReporting;