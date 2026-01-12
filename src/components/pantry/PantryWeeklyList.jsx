import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';

export default function PantryWeeklyList() {
  const pantryRecords = useStore((state) => state.pantryRecords);
 const pantryLoading = useStore((state) => state.pantryLoading);
const pantryError = useStore((state) => state.pantryError);
  const fetchPantryRecords = useStore((state) => state.fetchPantryRecords);
  const deletePantryRecord = useStore((state) => state.deletePantryRecord);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPantryRecords();
  }, [fetchPantryRecords]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this pantry record?')) {
      await deletePantryRecord(id);
    }
  };

  const handleEdit = (id) => {
    navigate(`/pantry/weekly/edit/${id}`);
  };

  if (pantryLoading) {
    return (
      <div className="hub-container">
        <div className="table-loading">Loading pantry records...</div>
      </div>
    );
  }

  if (pantryError) {
    return (
      <div className="hub-container">
        <div className="table-error">Error: {pantryError}</div>
      </div>
    );
  }

  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Pantry Distribution - Weekly Records</h2>
        <div className="department-actions">
          <Link to="/pantry/weekly" className="active">Data Entry</Link>
          <Link to="/pantry/reports">Reports</Link>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <Link to="/pantry/weekly/new" className="btn btn-primary">
          Add New Record
        </Link>
      </div>

      {pantryRecords.length === 0 ? (
        <div className="table-empty">
          No pantry records found. Click "Add New Record" to create one.
        </div>
      ) : (
        <div className="table-container">
          <table className="table-app">
            <thead>
              <tr>
                <th>Week Date</th>
                <th className="col-number">First-Time</th>
                <th className="col-number">Returning</th>
                <th className="col-number">Adults</th>
                <th className="col-number">Children</th>
                <th className="col-number">Seniors</th>
                <th className="col-number">Total Pounds</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pantryRecords.map((record) => (
                <tr key={record.id}>
                  <td>{new Date(record.week_date).toLocaleDateString()}</td>
                  <td className="col-number">{record.first_time_households}</td>
                  <td className="col-number">{record.returning_households}</td>
                  <td className="col-number">{record.total_adults}</td>
                  <td className="col-number">{record.total_children}</td>
                  <td className="col-number">{record.total_seniors}</td>
                  <td className="col-number">{record.total_pounds_distributed}</td>
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