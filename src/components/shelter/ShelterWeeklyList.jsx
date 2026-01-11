import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';
import './Shelter.css';

function ShelterWeeklyList() {
  const navigate = useNavigate();
  const [year, setYear] = useState(2025);
  
  const records = useStore((state) => state.shelter.records);
  const loading = useStore((state) => state.shelter.loading);
  const error = useStore((state) => state.shelter.error);
  const fetchRecords = useStore((state) => state.fetchShelterRecords);
  const deleteRecord = useStore((state) => state.deleteShelterRecord);
  
  useEffect(() => {
    fetchRecords(year);
  }, [fetchRecords, year]);
  
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return dateString.split('T')[0];
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
      <h2>Shelter Weekly Reports</h2>
      
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
            onClick={() => navigate('/shelter/weekly/new')}
          >
            ➕ New Report
          </button>
          
          <button 
            className="btn btn-sm btn-info"
            onClick={() => navigate('/shelter/reports')}
            style={{ marginLeft: '8px' }}
          >
            📊 View Reports
          </button>
        </div>
      </div>
      
      {records.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏠</div>
          <p>No records found for {year}.</p>
          <p>Click "New Report" to create one.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table-app table-hover table-striped weekly-reports-table">
            <thead>
              <tr>
                <th>Week Of</th>
                <th className="col-number">Total Guests</th>
                <th className="col-number">Single Men</th>
                <th className="col-number">Single Women</th>
                <th className="col-number">Families</th>
                <th className="col-number">Incidents</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id}>
                  <td>{formatDate(r.date)}</td>
                  <td className="col-number">{r.total_guests}</td>
                  <td className="col-number">{r.single_men}</td>
                  <td className="col-number">{r.single_women}</td>
                  <td className="col-number">{r.families}</td>
                  <td className="col-number">{r.incident_reports}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn btn-sm btn-table-edit"
                        onClick={() => navigate(`/shelter/weekly/edit/${r.id}`)}
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

export default ShelterWeeklyList;