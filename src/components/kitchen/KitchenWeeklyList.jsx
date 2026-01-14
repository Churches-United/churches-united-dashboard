import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';

export default function KitchenWeeklyList() {
  const navigate = useNavigate();
  const { kitchenRecords, fetchKitchenRecords, deleteKitchenRecord, kitchenLoading, kitchenError } = useStore();

  useEffect(() => {
    fetchKitchenRecords();
  }, [fetchKitchenRecords]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await deleteKitchenRecord(id);
    }
  };

  if (kitchenLoading) {
    return <div className="container mt-4"><h3>Loading...</h3></div>;
  }

  if (kitchenError) {
    return <div className="container mt-4 alert alert-danger">{kitchenError}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Kitchen Weekly Records</h2>
        <div>
          <Link to="/kitchen" className="btn btn-secondary me-2">
            Back to Kitchen Home
          </Link>
          <Link to="/kitchen/weekly/new" className="btn btn-primary">
            Add New Record
          </Link>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Week Date</th>
              <th>Total Meals Served</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {kitchenRecords?.length > 0 ? (
              kitchenRecords.map((record) => (
                <tr key={record.id}>
                  <td>{new Date(record.week_date).toLocaleDateString()}</td>
                  <td>{record.total_meals_served}</td>
                  <td>{record.notes || 'N/A'}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/kitchen/weekly/edit/${record.id}`)}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No records found. Click "Add New Record" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}