import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';

function FinanceWeeklyList() {
  const navigate = useNavigate();
  
  const records = useStore((state) => state.finance.records);
  const loading = useStore((state) => state.finance.loading);
  const error = useStore((state) => state.finance.error);
  const fetchRecords = useStore((state) => state.fetchFinanceRecords);
  const deleteRecord = useStore((state) => state.deleteFinanceRecord);
  const submitRecord = useStore((state) => state.submitFinanceRecord);
  
  useEffect(() => {
    fetchRecords(2025);
  }, [fetchRecords]);
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await deleteRecord(id);
    }
  };
  
  const handleSubmit = async (id) => {
    if (window.confirm('Submit this report?')) {
      await submitRecord(id);
    }
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  
  return (
    <div>
      <h2>Finance Weekly Reports - 2025</h2>
      
      <div style={{ 
        marginBottom: '20px', 
        display: 'flex', 
        gap: '10px',
        padding: '10px',
        background: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <button 
          onClick={() => navigate('/finance/weekly/new')}
          style={{
            padding: '10px 20px',
            background: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ➕ New Report
        </button>
        
        <button 
          onClick={() => navigate('/finance/reports')}
          style={{
            padding: '10px 20px',
            background: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          📊 View Reports
        </button>
      </div>
      
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
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{formatCurrency(record.total_assets)}</td>
              <td>{formatCurrency(record.operating_account_balance)}</td>
              <td style={{ color: 'green' }}>{formatCurrency(record.revenue_received)}</td>
              <td style={{ color: 'red' }}>{formatCurrency(record.bills_paid)}</td>
              <td style={{ color: 'red' }}>{formatCurrency(record.payroll_paid)}</td>
              <td style={{ color: record.net_change >= 0 ? 'green' : 'red' }}>
                {formatCurrency(record.net_change)}
              </td>
              <td>
                {record.submitted_at ? (
                  <span>✅ Submitted</span>
                ) : (
                  <span>📝 Draft</span>
                )}
              </td>
              <td>
                <button onClick={() => navigate(`/finance/weekly/edit/${record.id}`)}>
                  View/Edit
                </button>
                
                {!record.submitted_at && (
                  <button onClick={() => handleSubmit(record.id)}>Submit</button>
                )}
                
                <button onClick={() => handleDelete(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {records.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          No records found. Click "New Report" to create one.
        </p>
      )}
    </div>
  );
}

export default FinanceWeeklyList;