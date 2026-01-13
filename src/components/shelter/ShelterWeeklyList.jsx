import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: '2-digit', 
      day: '2-digit', 
      year: 'numeric' 
    });
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
      <div className="department-header">
        <h2>Shelter - Weekly Records</h2>
        <div className="department-actions">
          <Link to="/shelter" className="active">Data Entry</Link>
          <Link to="/shelter/reports">Reports</Link>
        </div>
      </div>

      <div className="toolbar-actions-top">
        <Link to="/shelter/weekly/new" className="btn-add-record">
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
                <th>Week Date</th>
                <th className="col-number">Total Guests</th>
                <th className="col-number">Single Men</th>
                <th className="col-number">Single Women</th>
                <th className="col-number">Families</th>
                <th className="col-number">Incidents</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{formatDate(record.date)}</td>
                  <td className="col-number">{record.total_guests || 0}</td>
                  <td className="col-number">{record.single_men || 0}</td>
                  <td className="col-number">{record.single_women || 0}</td>
                  <td className="col-number">{record.families || 0}</td>
                  <td className="col-number">{record.incident_reports || 0}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn-table-edit"
                        onClick={() => navigate(`/shelter/weekly/edit/${record.id}`)}
                      >
                        Edit
                      </button>
                      
                      <button
                        className="btn-table-delete"
                        onClick={() => handleDelete(record.id)}
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