import React from 'react';
import { Link } from 'react-router-dom';

export default function FinanceHome() {
  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Finance</h2>
        <div className="department-actions">
          <Link to="/finance" className="active">Data Entry</Link>
          <Link to="/finance/reports">Reports</Link>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">💰 Weekly Finance Management</h5>
              <p className="card-text">
                Track revenue, expenses, payroll, assets, and financial positions on a weekly basis.
              </p>
              <Link to="/finance/weekly" className="btn btn-primary">
                View Weekly Records
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">📈 Finance Reports & Analytics</h5>
              <p className="card-text">
                View comprehensive reports on cash flow analysis and financial metrics
              </p>
              <Link to="/finance/reports" className="btn btn-primary">
                View Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}