
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';

function ComplianceWeeklyList() {
  const navigate = useNavigate();
  
  const records = useStore((state) => state.compliance.records);
  const loading = useStore((state) => state.compliance.loading);
  const error = useStore((state) => state.compliance.error);
  const fetchRecords = useStore((state) => state.fetchComplianceRecords);
  const deleteRecord = useStore((state) => state.deleteComplianceRecord);
  const submitRecord = useStore((state) => state.submitComplianceRecord);
  
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
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  
  return (
    <div>
      <h2>Compliance Weekly Reports - 2025</h2>
      
      {/* ✅ ADD THIS SECTION */}
      <div style={{ 
        marginBottom: '20px', 
        display: 'flex', 
        gap: '10px',
        padding: '10px',
        background: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <button 
          onClick={() => navigate('/compliance/weekly/new')}
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
          onClick={() => navigate('/compliance/reports')}
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
          📊 View Reports & Analytics
        </button>
      </div>
      {/* ✅ END NEW SECTION */}
      
      <table border="1">
        <thead>
          <tr>
            <th>Week Of</th>
            <th>Households</th>
            <th>Individuals</th>
            <th>Exits</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.total_households}</td>
              <td>{record.total_individuals}</td>
              <td>{record.total_exits}</td>
              <td>
                {record.submitted_at ? (
                  <span>✅ Submitted</span>
                ) : (
                  <span>📝 Draft</span>
                )}
              </td>
              <td>
                <button onClick={() => console.log('View', record.id)}>View</button>
                
                {!record.submitted_at && (
                  <>
                    <button onClick={() => navigate(`/compliance/weekly/edit/${record.id}`)}>
                      Edit
                    </button>
                    <button onClick={() => handleSubmit(record.id)}>Submit</button>
                  </>
                )}
                
                <button onClick={() => handleDelete(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComplianceWeeklyList;