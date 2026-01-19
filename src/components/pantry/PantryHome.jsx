import React from 'react';
import { Link } from 'react-router-dom';

export default function PantryHome() {
  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Pantry Distribution</h2>
        <div className="department-actions">
          <Link to="/pantry/weekly" className="active">Data Entry</Link>
          <Link to="/pantry/reports">Reports</Link>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title"> Weekly Records</h5>
              <p className="card-text">
                Track weekly food distribution and total pounds distributed.
              </p>
              <Link to="/pantry/weekly" className="btn btn-secondary">
                View Weekly Records
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title"> Reports </h5>
              <p className="card-text">
                View comprehensive pantry reports.
              </p>
              <Link to="/pantry/reports" className="btn btn-secondary">
                View Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}