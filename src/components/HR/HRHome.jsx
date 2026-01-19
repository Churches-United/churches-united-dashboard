import React from 'react';
import { Link } from 'react-router-dom';

export default function HRHome() {
  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Human Resources</h2>
        <div className="department-actions">
          <Link to="/hr/weekly" className="active">Data Entry</Link>
          <Link to="/hr/reports">Reports</Link>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Weekly HR Management</h5>
              <p className="card-text">
                Track staffing levels, new hires, employee turnover, and performance evaluations on a weekly basis.
              </p>
              <Link to="/hr/weekly" className="btn btn-secondary">
                View Weekly Records
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">HR Reports & Analytics</h5>
              <p className="card-text">
                View comprehensive reports on hiring trends and staff stats
              </p>
              <Link to="/hr/reports" className="btn btn-secondary">
                View Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}