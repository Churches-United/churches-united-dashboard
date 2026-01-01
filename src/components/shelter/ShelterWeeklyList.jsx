import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';

function ShelterWeeklyList() {
  const navigate = useNavigate();
  
  const records = useStore((state) => state.shelter.records);
  const loading = useStore((state) => state.shelter.loading);
  const error = useStore((state) => state.shelter.error);
  const fetchRecords = useStore((state) => state.fetchShelterRecords);
  const deleteRecord = useStore((state) => state.deleteShelterRecord);
  const submitRecord = useStore((state) => state.submitShelterRecord);
  
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
      <h2>Shelter Weekly Reports - 2025</h2>
      
      <div style={{ 
        marginBottom: '20px', 
        display: 'flex', 
        gap: '10px',
        padding: '10px',
        background: '#f5f5f5',
        borderRadius: '4px'
      }}>
        <button 
          onClick={() => navigate('/shelter/weekly/new')}
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
          onClick={() => navigate('/shelter/reports')}
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
      
      <table border="1">
        <thead>
          <tr>
            <th>Week Of</th>
            <th>Total Guests</th>
            <th>Single Men</th>
            <th>Single Women</th>
            <th>Families</th>
            <th>Incidents</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.total_guests}</td>
              <td>{record.single_men}</td>
              <td>{record.single_women}</td>
              <td>{record.families}</td>
              <td>{record.incident_reports}</td>
              <td>
                {record.submitted_at ? (
                  <span>✅ Submitted</span>
                ) : (
                  <span>📝 Draft</span>
                )}
              </td>
              <td>
                <button onClick={() => navigate(`/shelter/weekly/edit/${record.id}`)}>
                  View/Edit
                </button>
                
                {!record.submitted_at && (
                  <>
                    <button onClick={() => handleSubmit(record.id)}>Submit</button>
                  </>
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

export default ShelterWeeklyList;