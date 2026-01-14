import { useEffect, useState } from "react";
import useStore from "../../zustand/store";
//import "./Finance.css";

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
    return dateString.split('T')[0];
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
  
  if (loading) return <div className="report-loading">Loading...</div>;
  if (error) return <div className="report-error">Error: {error}</div>;

  // ========== METRICS TAB RENDER ==========
  
  const renderMetrics = () => {
    if (!metrics) {
      return (
        <div className="report-empty-state">
          <div className="report-empty-state-icon">📊</div>
          <p>No metrics data available for {year}</p>
        </div>
      );
    }

    const expenseChartData = getExpenseBreakdownChartData();
    const weeklyAvgChartData = getWeeklyAveragesChartData();

    return (
      <div className="reporting-content">
        <h3>Financial Metrics Overview</h3>
        
        {/* Charts Section */}
        <div style={{ marginBottom: '32px' }}>
          {weeklyAvgChartData && (
            <div style={{ marginBottom: '24px' }}>
              <BarChart 
                data={weeklyAvgChartData} 
                title="Weekly Averages"
              />
            </div>
          )}
          
          {expenseChartData && (
            <div style={{ marginBottom: '24px' }}>
              <PieChart 
                data={expenseChartData} 
                title="Expense Breakdown"
              />
            </div>
          )}
        </div>

        {/* Annual Totals */}
        <div className="report-section-title">Annual Totals</div>
        <table className="summary-table">
          <tbody>
            <tr>
              <td>Total Revenue:</td>
              <td className="text-positive">{formatCurrency(metrics.total_revenue)}</td>
            </tr>
            <tr>
              <td>Total Bills Paid:</td>
              <td className="text-negative">{formatCurrency(metrics.total_bills)}</td>
            </tr>
            <tr>
              <td>Total Payroll:</td>
              <td className="text-negative">{formatCurrency(metrics.total_payroll)}</td>
            </tr>
            <tr>
              <td>Net Change (Year):</td>
              <td className={metrics.net_change_year >= 0 ? 'text-positive' : 'text-negative'}>
                {formatCurrency(metrics.net_change_year)}
              </td>
            </tr>
            <tr>
              <td>Total Weeks Reported:</td>
              <td className="text-neutral">{metrics.total_weeks || 0}</td>
            </tr>
          </tbody>
        </table>

        {/* Weekly Averages */}
        <div className="report-section-title">Weekly Averages</div>
        <table className="summary-table">
          <tbody>
            <tr>
              <td>Avg Weekly Revenue:</td>
              <td>{formatCurrency(metrics.avg_weekly_revenue)}</td>
            </tr>
            <tr>
              <td>Avg Weekly Bills:</td>
              <td>{formatCurrency(metrics.avg_weekly_bills)}</td>
            </tr>
            <tr>
              <td>Avg Weekly Payroll:</td>
              <td>{formatCurrency(metrics.avg_weekly_payroll)}</td>
            </tr>
          </tbody>
        </table>

        {/* Asset Positions */}
        <div className="report-section-title">Asset Positions</div>
        <table className="summary-table">
          <tbody>
            <tr>
              <td>Average Total Assets:</td>
              <td>{formatCurrency(metrics.avg_assets)}</td>
            </tr>
            <tr>
              <td>Max Total Assets:</td>
              <td>{formatCurrency(metrics.max_assets)}</td>
            </tr>
            <tr>
              <td>Min Total Assets:</td>
              <td>{formatCurrency(metrics.min_assets)}</td>
            </tr>
            <tr>
              <td>Avg Operating Balance:</td>
              <td>{formatCurrency(metrics.avg_operating_balance)}</td>
            </tr>
            <tr>
              <td>Max Operating Balance:</td>
              <td>{formatCurrency(metrics.max_operating_balance)}</td>
            </tr>
            <tr>
              <td>Min Operating Balance:</td>
              <td>{formatCurrency(metrics.min_operating_balance)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  // ========== CASHFLOW TAB RENDER ==========
  
  const renderCashflow = () => {
    if (!cashflow || cashflow.length === 0) {
      return (
        <div className="report-empty-state">
          <div className="report-empty-state-icon">💰</div>
          <p>No cash flow data available for {year}</p>
        </div>
      );
    }

    const chartData = getCashFlowChartData();

    return (
      <div className="reporting-content">
        <h3>Cash Flow Analysis</h3>
        
        {/* Line Chart */}
        {chartData && (
          <div style={{ marginBottom: '32px' }}>
            <LineChart 
              data={chartData} 
              title="Cash Flow Over Time"
            />
          </div>
        )}

        {/* Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Week Of</th>
              <th className="col-currency">Revenue</th>
              <th className="col-currency">Total Expenses</th>
              <th className="col-currency">Net Change</th>
              <th className="col-currency">Operating Balance</th>
            </tr>
          </thead>
          <tbody>
            {cashflow.map((week, index) => (
              <tr key={index}>
                <td>{formatDate(week.date)}</td>
                <td className="col-currency text-positive">{formatCurrency(week.revenue_received)}</td>
                <td className="col-currency text-negative">{formatCurrency(week.total_expenses)}</td>
                <td className={`col-currency ${week.net_change >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {formatCurrency(week.net_change)}
                </td>
                <td className="col-currency">{formatCurrency(week.operating_account_balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // ========== SUMMARY TAB RENDER ==========
  
  const renderSummary = () => {
    if (!summary || summary.length === 0) {
      return (
        <div className="report-empty-state">
          <div className="report-empty-state-icon">📋</div>
          <p>No summary data available for {year}</p>
        </div>
      );
    }

    const revenueVsExpensesData = getRevenueVsExpensesData();
    const netChangeData = getNetChangeData();
    const operatingBalanceData = getOperatingBalanceData();
    const totalAssetsData = getTotalAssetsData();

    return (
      <div className="reporting-content">
        <h3>Weekly Summary</h3>
        
        {/* Charts Grid */}
        <div style={{ marginBottom: '32px' }}>
          
          {/* Chart 1: Revenue vs Expenses (Full Width) */}
          {revenueVsExpensesData && (
            <div style={{ marginBottom: '24px' }}>
              <LineChart 
                data={revenueVsExpensesData} 
                title="Revenue vs Expenses Over Time"
              />
            </div>
          )}

          {/* Two Column Layout for smaller charts */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
            gap: '24px',
            marginBottom: '24px'
          }}>
            {/* Chart 2: Net Change */}
            {netChangeData && (
              <BarChart 
                data={netChangeData} 
                title="Weekly Net Change"
              />
            )}

            {/* Chart 3: Operating Balance */}
            {operatingBalanceData && (
              <LineChart 
                data={operatingBalanceData} 
                title="Operating Balance Trend"
              />
            )}
          </div>

          {/* Chart 4: Total Assets (Full Width) */}
          {totalAssetsData && (
            <div style={{ marginBottom: '24px' }}>
              <LineChart 
                data={totalAssetsData} 
                title="Total Assets Over Time"
              />
            </div>
          )}
        </div>

        {/* Data Table */}
        <div className="report-section-title">Detailed Weekly Data</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Week Of</th>
              <th className="col-currency">Total Assets</th>
              <th className="col-currency">Operating Balance</th>
              <th className="col-currency">Revenue</th>
              <th className="col-currency">Bills Paid</th>
              <th className="col-currency">Payroll</th>
              <th className="col-currency">Net Change</th>
              <th>Major Expenses</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((week, index) => (
              <tr key={index}>
                <td>{formatDate(week.date)}</td>
                <td className="col-currency">{formatCurrency(week.total_assets)}</td>
                <td className="col-currency">{formatCurrency(week.operating_account_balance)}</td>
                <td className="col-currency text-positive">{formatCurrency(week.revenue_received)}</td>
                <td className="col-currency text-negative">{formatCurrency(week.bills_paid)}</td>
                <td className="col-currency text-negative">{formatCurrency(week.payroll_paid)}</td>
                <td className={`col-currency ${week.net_change >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {formatCurrency(week.net_change)}
                </td>
                <td>{week.major_expenses || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // ========== MAIN RENDER ==========
  
  return (
    <div className="reporting-container">
      <div className="reporting-header">
        <h2>Finance Reports - {year}</h2>
      </div>

      <div className="reporting-year-selector">
        <label>Year:</label>
        <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>

      <div className="reporting-tabs">
        <button 
          className={`reporting-tab ${activeTab === "metrics" ? "active" : ""}`}
          onClick={() => setActiveTab("metrics")}
        >
          Financial Metrics
        </button>
        <button 
          className={`reporting-tab ${activeTab === "cashflow" ? "active" : ""}`}
          onClick={() => setActiveTab("cashflow")}
        >
          Cash Flow
        </button>
        <button 
          className={`reporting-tab ${activeTab === "summary" ? "active" : ""}`}
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