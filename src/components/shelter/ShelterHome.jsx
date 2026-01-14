import React from 'react';
import { Link } from 'react-router-dom';

export default function ShelterHome() {
  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Shelter</h2>
        <div className="department-actions">
          <Link to="/shelter" className="active">Data Entry</Link>
          <Link to="/shelter/reports">Reports</Link>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">🏠 Weekly Shelter Management</h5>
              <p className="card-text">
                Track guest counts, occupancy levels, incident reports, and operational metrics on a weekly basis.
              </p>
              <Link to="/shelter/weekly" className="btn btn-primary">
                View Weekly Records
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📈 Shelter Reports & Analytics</h5>
              <p className="card-text">
                View comprehensive reports on occupancy trends and shelter operations
              </p>
              <Link to="/shelter/reports" className="btn btn-primary">
                View Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}