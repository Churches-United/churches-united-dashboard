import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store'; 

function ComplianceWeeklyList() {
  const navigate = useNavigate();
  
  // Get state directly from store
  const records = useStore((state) => state.compliance.records);
  const loading = useStore((state) => state.compliance.loading);
  const error = useStore((state) => state.compliance.error);
  
  // Get actions from store
  const fetchRecords = useStore((state) => state.fetchComplianceRecords);
  const deleteRecord = useStore((state) => state.deleteComplianceRecord);
  const submitRecord = useStore((state) => state.submitComplianceRecord);
  
  // Fetch records on mount
  useEffect(() => {
    fetchRecords(2025);
  }, [fetchRecords]);
  
  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await deleteRecord(id);
        alert('Record deleted successfully!');
      } catch (error) {
        alert('Failed to delete record');
      }
    }
  };
  
  // Handle submit
  const handleSubmit = async (id) => {
    if (window.confirm('Submit this record for review?')) {
      try {
        await submitRecord(id);
        alert('Record submitted successfully!');
      } catch (error) {
        alert('Failed to submit record');
      }
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div>
        <h2>Compliance Weekly Reports</h2>
        <p>⏳ Loading...</p>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div>
        <h2>Compliance Weekly Reports</h2>
        <p style={{ color: 'red' }}>❌ Error: {error}</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2>Compliance Weekly Reports - 2025</h2>
      
      <button onClick={() => navigate('/compliance/weekly/new')}>
        + New Report
      </button>
      
      {records.length === 0 ? (
        <div>
          <p>No records found for 2025</p>
          <button onClick={() => navigate('/compliance/weekly/new')}>
            Create First Report
          </button>
        </div>
      ) : (
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
                  <button onClick={() => console.log('View', record.id)}>
                    View
                  </button>
                  
                  {!record.submitted_at && (
                    <>
                      <button onClick={() => navigate(`/compliance/weekly/edit/${record.id}`)}>
                        Edit
                      </button>
                      
                      <button onClick={() => handleSubmit(record.id)}>
                        Submit
                      </button>
                    </>
                  )}
                  
                  <button onClick={() => handleDelete(record.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ComplianceWeeklyList;