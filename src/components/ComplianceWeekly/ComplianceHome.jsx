import React from 'react';
import { Link } from 'react-router-dom';
import './ComplianceWeekly.css';

export default function ComplianceHome() {
  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Compliance</h2>
        <div className="department-actions">
          <Link to="/compliance" className="active">Data Entry</Link>
          <Link to="/compliance/reports">Reports</Link>
        </div>
      </div>

      <div className="row">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">📊 Weekly Compliance Management</h5>
            <p className="card-text">
              Track household demographics, age groups, gender, race, health conditions, and exits on a weekly basis.
            </p>
            <Link to="/compliance/weekly" className="btn-primary">
              View Weekly Records
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">📈 Compliance Reports & Analytics</h5>
            <p className="card-text">
              View comprehensive reports on demographics trends and compliance stats
            </p>
            <Link to="/compliance/reports" className="btn-primary">
              View Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}