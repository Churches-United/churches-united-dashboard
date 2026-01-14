
import React from 'react';
import { Link } from 'react-router-dom';


export default function KitchenHome() {
  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Kitchen Services</h2>
        <div className="department-actions">
          <Link to="/kitchen/weekly" className="active">Data Entry</Link>
          <Link to="/kitchen/reports">Reports</Link>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Weekly Kitchen Management</h5>
              <p className="card-text">
                Track meals served, inventory usage, volunteer hours, and food waste on a weekly basis.
              </p>
              <Link to="/kitchen/weekly" className="btn btn-primary">
                View Weekly Records
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title"> Kitchen Reports & Analytics</h5>
              <p className="card-text">
                View comprehensive reports on meal service trends and resource utilization
              </p>
              <Link to="/kitchen/reports" className="btn btn-primary">
                View Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

