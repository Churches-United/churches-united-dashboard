import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useStore from '../../zustand/store';
import '../../styles/tables.css';

function ComplianceWeeklyList() {
  const navigate = useNavigate();
  const [year, setYear] = useState(2025);
  
  const records = useStore((state) => state.compliance.records);
  const loading = useStore((state) => state.compliance.loading);
  const error = useStore((state) => state.compliance.error);
  const fetchRecords = useStore((state) => state.fetchComplianceRecords);
  const deleteRecord = useStore((state) => state.deleteComplianceRecord);
  
  useEffect(() => {
    fetchRecords(year);
  }, [fetchRecords, year]);
  
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US');
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
        <h2>Compliance - Weekly Records</h2>
        <div className="department-actions">
          <Link to="/compliance" className="active">Data Entry</Link>
          <Link to="/compliance/reports">Reports</Link>
        </div>
      </div>

      {/* Toolbar with Year Selector and Add Button */}
      <div className="toolbar-container">
        <div className="toolbar-left">
          <div className="filter-group">
            <label htmlFor="year-select">Year:</label>
            <select 
              id="year-select"
              value={year} 
              onChange={(e) => setYear(parseInt(e.target.value))}
            >
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>
        </div>

        <div className="toolbar-right">
          <Link to="/compliance/weekly/new" className="btn-add-record">
            Add New Record
          </Link>
        </div>
      </div>
      
      {records.length === 0 ? (
        <div className="table-empty">
          <p>No records found for {year}.</p>
          <p>Click "Add New Record" to create one.</p>
        </div>
      ) : (
        <div className="table-container" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <table className="table-app table-hover table-striped">
            <thead>
              <tr>
                <th>Week Date</th>
                <th className="col-number">Total Households</th>
                <th className="col-number">Total Individuals</th>
                <th className="col-number">Adults</th>
                <th className="col-number">Children</th>
                <th className="col-number">Total Exits</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{formatDate(record.date)}</td>
                  <td className="col-number">{record.total_households || 0}</td>
                  <td className="col-number">{record.total_individuals || 0}</td>
                  <td className="col-number">{record.adults || 0}</td>
                  <td className="col-number">{record.children || 0}</td>
                  <td className="col-number">{record.total_exits || 0}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn btn-sm btn-table-edit"
                        onClick={() => navigate(`/compliance/weekly/edit/${record.id}`)}
                      >
                        Edit
                      </button>
                      
                      <button
                        className="btn btn-sm btn-table-delete"
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

export default ComplianceWeeklyList;