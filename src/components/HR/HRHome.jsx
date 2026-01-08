import React from 'react';
import { Link } from 'react-router-dom';

export default function HRHome() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Human Resources Dashboard</h1>
      
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Weekly HR Management</h5>
              <p className="card-text">
                Track positions, hiring, turnover, and evaluations for each week.
              </p>
              <Link to="/hr/weekly" className="btn btn-primary">
                View Weekly Records
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">HR Reports</h5>
              <p className="card-text">
                View comprehensive reports and analytics on staffing trends.
              </p>
              <Link to="/hr/reports" className="btn btn-success">
                View Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}