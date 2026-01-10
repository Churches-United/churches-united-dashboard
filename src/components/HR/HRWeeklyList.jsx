import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';

export default function HRWeeklyList() {
  const hrRecords = useStore((state) => state.hrRecords);
  const hrLoading = useStore((state) => state.hrLoading);
  const hrError = useStore((state) => state.hrError);
  const fetchHRRecords = useStore((state) => state.fetchHRRecords);
  const deleteHRRecord = useStore((state) => state.deleteHRRecord);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHRRecords();
  }, [fetchHRRecords]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this HR record?')) {
      await deleteHRRecord(id);
    }
  };

  const handleEdit = (id) => {
    navigate(`/hr/weekly/edit/${id}`);
  };

  if (hrLoading) {
    return (
      <div className="hub-container">
        <div className="table-loading">Loading HR records...</div>
      </div>
    );
  }

  if (hrError) {
    return (
      <div className="hub-container">
        <div className="table-error">Error: {hrError}</div>
      </div>
    );
  }

  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Human Resources - Weekly Records</h2>
        <div className="department-actions">
          <Link to="/hr/weekly" className="active">Data Entry</Link>
          <Link to="/hr/reports">Reports</Link>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <Link to="/hr/weekly/new" className="btn btn-primary">
          Add New Record
        </Link>
      </div>

      {hrRecords.length === 0 ? (
        <div className="table-empty">
          No HR records found. Click "Add New Record" to create one.
        </div>
      ) : (
        <div className="table-container">
          <table className="table-app">
            <thead>
              <tr>
                <th>Week Date</th>
                <th className="col-number">Total Positions</th>
                <th className="col-number">Open Positions</th>
                <th className="col-number">New Hires</th>
                <th className="col-number">Turnover</th>
                <th className="col-number">Evaluations Due</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hrRecords.map((record) => (
                <tr key={record.id}>
                  <td>{new Date(record.week_date).toLocaleDateString()}</td>
                  <td className="col-number">{record.total_positions}</td>
                  <td className="col-number">{record.open_positions}</td>
                  <td className="col-number">{record.new_hires_this_week}</td>
                  <td className="col-number">{record.employee_turnover}</td>
                  <td className="col-number">{record.evaluations_due}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        onClick={() => handleEdit(record.id)}
                        className="btn-table-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(record.id)}
                        className="btn-table-delete"
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