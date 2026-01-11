import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';
import './Finance.css';

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
  
  if (loading) return <div className="loading-state">Loading...</div>;
  if (error) return <div className="error-state">Error: {error}</div>;
  
  return (
    <div className="weekly-reports-container">
      <h2>Finance Weekly Reports</h2>
      
      <div className="weekly-reports-toolbar">
        <div className="toolbar-left">
          <div className="filter-group">
            <label>View Year:</label>
            <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>
        </div>
        
        <div className="toolbar-right">
          <button 
            className="btn btn-sm btn-primary"
            onClick={() => navigate('/finance/weekly/new')}
          >
            ➕ New Report
          </button>
          
          <button 
            className="btn btn-sm btn-info"
            onClick={() => navigate('/finance/reports')}
            style={{ marginLeft: '8px' }}
          >
            📊 View Reports
          </button>
        </div>
      </div>
      
      {records.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💰</div>
          <p>No records found for {year}.</p>
          <p>Click "New Report" to create one.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table-app table-hover table-striped weekly-reports-table">
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
                        className="btn btn-sm btn-table-edit"
                        onClick={() => navigate(`/finance/weekly/edit/${r.id}`)}
                      >
                        Edit
                      </button>
                      
                      <button
                        className="btn btn-sm btn-table-delete"
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