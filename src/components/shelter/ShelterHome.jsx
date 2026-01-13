import React from 'react';
import { Link } from 'react-router-dom';
import './Shelter.css';

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

      <div className="row">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">🏠 Weekly Shelter Management</h5>
            <p className="card-text">
              Track guest counts, occupancy levels, incident reports, and operational metrics on a weekly basis.
            </p>
            <Link to="/shelter/weekly" className="btn-primary">
              View Weekly Records
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">📈 Shelter Reports & Analytics</h5>
            <p className="card-text">
              View comprehensive reports on occupancy trends and shelter operations
            </p>
            <Link to="/shelter/reports" className="btn-primary">
              View Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}