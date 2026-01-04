import { useEffect, useState } from "react";
import useStore from "../../zustand/store";

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

  if (loading) return <p>⏳ Loading reports...</p>;
  if (error) return <p style={{ color: 'red' }}>❌ Error: {error}</p>;

  const renderMetrics = () => {
    if (!metrics) return <p>No metrics data available</p>;

    return (
      <div>
        <h3>Financial Metrics Overview</h3>
        
        <fieldset>
          <legend>Annual Totals</legend>
          <table border="1">
            <tbody>
              <tr>
                <td><strong>Total Revenue:</strong></td>
                <td style={{ color: 'green' }}>{formatCurrency(metrics.total_revenue)}</td>
              </tr>
              <tr>
                <td><strong>Total Bills Paid:</strong></td>
                <td style={{ color: 'red' }}>{formatCurrency(metrics.total_bills)}</td>
              </tr>
              <tr>
                <td><strong>Total Payroll:</strong></td>
                <td style={{ color: 'red' }}>{formatCurrency(metrics.total_payroll)}</td>
              </tr>
              <tr>
                <td><strong>Net Change (Year):</strong></td>
                <td style={{ color: metrics.net_change_year >= 0 ? 'green' : 'red', fontWeight: 'bold' }}>
                  {formatCurrency(metrics.net_change_year)}
                </td>
              </tr>
              <tr>
                <td><strong>Total Weeks Reported:</strong></td>
                <td>{metrics.total_weeks || 0}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        <fieldset>
          <legend>Weekly Averages</legend>
          <table border="1">
            <tbody>
              <tr>
                <td><strong>Avg Weekly Revenue:</strong></td>
                <td>{formatCurrency(metrics.avg_weekly_revenue)}</td>
              </tr>
              <tr>
                <td><strong>Avg Weekly Bills:</strong></td>
                <td>{formatCurrency(metrics.avg_weekly_bills)}</td>
              </tr>
              <tr>
                <td><strong>Avg Weekly Payroll:</strong></td>
                <td>{formatCurrency(metrics.avg_weekly_payroll)}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>

        <fieldset>
          <legend>Asset Positions</legend>
          <table border="1">
            <tbody>
              <tr>
                <td><strong>Average Total Assets:</strong></td>
                <td>{formatCurrency(metrics.avg_assets)}</td>
              </tr>
              <tr>
                <td><strong>Max Total Assets:</strong></td>
                <td>{formatCurrency(metrics.max_assets)}</td>
              </tr>
              <tr>
                <td><strong>Min Total Assets:</strong></td>
                <td>{formatCurrency(metrics.min_assets)}</td>
              </tr>
              <tr>
                <td><strong>Avg Operating Balance:</strong></td>
                <td>{formatCurrency(metrics.avg_operating_balance)}</td>
              </tr>
              <tr>
                <td><strong>Max Operating Balance:</strong></td>
                <td>{formatCurrency(metrics.max_operating_balance)}</td>
              </tr>
              <tr>
                <td><strong>Min Operating Balance:</strong></td>
                <td>{formatCurrency(metrics.min_operating_balance)}</td>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
    );
  };

  const renderCashflow = () => {
    if (!cashflow || cashflow.length === 0) return <p>No cash flow data available</p>;

    return (
      <div>
        <h3>Cash Flow Analysis</h3>
        <table border="1">
          <thead>
            <tr>
              <th>Week Of</th>
              <th>Revenue</th>
              <th>Total Expenses</th>
              <th>Net Change</th>
              <th>Operating Balance</th>
            </tr>
          </thead>
          <tbody>
            {cashflow.map((week) => (
              <tr key={week.date}>
                <td>{new Date(week.date).toLocaleDateString()}</td>
                <td style={{ color: 'green' }}>{formatCurrency(week.revenue_received)}</td>
                <td style={{ color: 'red' }}>{formatCurrency(week.total_expenses)}</td>
                <td style={{ color: week.net_change >= 0 ? 'green' : 'red' }}>
                  {formatCurrency(week.net_change)}
                </td>
                <td>{formatCurrency(week.operating_account_balance)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderSummary = () => {
    if (!summary || summary.length === 0) return <p>No summary data available</p>;

    return (
      <div>
        <h3>Weekly Summary</h3>
        <table border="1">
          <thead>
            <tr>
              <th>Week Of</th>
              <th>Total Assets</th>
              <th>Operating Balance</th>
              <th>Revenue</th>
              <th>Bills Paid</th>
              <th>Payroll</th>
              <th>Net Change</th>
              <th>Major Expenses</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((week) => (
              <tr key={week.date}>
                <td>{new Date(week.date).toLocaleDateString()}</td>
                <td>{formatCurrency(week.total_assets)}</td>
                <td>{formatCurrency(week.operating_account_balance)}</td>
                <td style={{ color: 'green' }}>{formatCurrency(week.revenue_received)}</td>
                <td style={{ color: 'red' }}>{formatCurrency(week.bills_paid)}</td>
                <td style={{ color: 'red' }}>{formatCurrency(week.payroll_paid)}</td>
                <td style={{ color: week.net_change >= 0 ? 'green' : 'red' }}>
                  {formatCurrency(week.net_change)}
                </td>
                <td>{week.major_expenses || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <h2>Finance Reports - {year}</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>Year: </label>
        <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setActiveTab("metrics")}>Financial Metrics</button>
        <button onClick={() => setActiveTab("cashflow")}>Cash Flow</button>
        <button onClick={() => setActiveTab("summary")}>Weekly Summary</button>
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