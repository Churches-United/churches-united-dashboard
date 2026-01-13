import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useStore from '../../zustand/store';
//import './Finance.css';

function FinanceWeeklyList() {
  const navigate = useNavigate();
  const [year, setYear] = useState(2025);
  
  const records = useStore((state) => state.finance.records);
  const loading = useStore((state) => state.finance.loading);
  const error = useStore((state) => state.finance.error);
  const fetchRecords = useStore((state) => state.fetchFinanceRecords);
  const deleteRecord = useStore((state) => state.deleteFinanceRecord);
  
  useEffect(() => {
    fetchRecords(year);
  }, [fetchRecords, year]);
  
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return dateString.split('T')[0];
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await deleteRecord(id);
    }
  };
  
  if (loading) return <div className="table-loading">Loading...</div>;
  if (error) return <div className="table-error">Error: {error}</div>;
  
  return (
    <div className="hub-container">
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
      
      <div className="department-header">
        <h2>Finance - Weekly Records</h2>
        <div className="department-actions">
          <Link to="/finance" className="active">Data Entry</Link>
          <Link to="/finance/reports">Reports</Link>
        </div>
      </div>

      <div className="toolbar-actions-top">
        <Link to="/finance/weekly/new" className="btn-add-record">
          Add New Record
        </Link>
      </div>
      
      {records.length === 0 ? (
        <div className="table-empty">
          <p>No records found for {year}.</p>
          <p>Click "Add New Record" to create one.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table-app">
            <thead>
              <tr>
                <th>Week Of</th>
                <th className="col-number">Total Assets</th>
                <th className="col-number">Operating Balance</th>
                <th className="col-number">Revenue</th>
                <th className="col-number">Bills Paid</th>
                <th className="col-number">Payroll</th>
                <th className="col-number">Net Change</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>{formatDate(r.date)}</td>
                  <td className="col-number">{formatCurrency(r.total_assets)}</td>
                  <td className="col-number">{formatCurrency(r.operating_account_balance)}</td>
                  <td className="col-number" style={{ color: 'green' }}>{formatCurrency(r.revenue_received)}</td>
                  <td className="col-number" style={{ color: 'red' }}>{formatCurrency(r.bills_paid)}</td>
                  <td className="col-number" style={{ color: 'red' }}>{formatCurrency(r.payroll_paid)}</td>
                  <td className="col-number" style={{ color: r.net_change >= 0 ? 'green' : 'red' }}>
                    {formatCurrency(r.net_change)}
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-table-edit"
                        onClick={() => navigate(`/finance/weekly/edit/${r.id}`)}
                      >
                        Edit
                      </button>
                      
                      <button
                        className="btn-table-delete"
                        onClick={() => handleDelete(r.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FinanceWeeklyList;