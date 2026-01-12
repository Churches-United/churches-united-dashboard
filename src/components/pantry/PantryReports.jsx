import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../zustand/store';

export default function PantryReports() {
  const pantryRecords = useStore((state) => state.pantryRecords);
 
  const fetchPantryRecords = useStore((state) => state.fetchPantryRecords);
  const pantryLoading = useStore((state) => state.pantryLoading);
const pantryError = useStore((state) => state.pantryError);

  useEffect(() => {
    fetchPantryRecords();
  }, [fetchPantryRecords]);

  const calculateStats = () => {
    if (pantryRecords.length === 0) return null;

    const totalFirstTime = pantryRecords.reduce((sum, r) => sum + (r.first_time_households || 0), 0);
    const totalReturning = pantryRecords.reduce((sum, r) => sum + (r.returning_households || 0), 0);
    const totalPounds = pantryRecords.reduce((sum, r) => sum + (r.total_pounds_distributed || 0), 0);
    const avgAdults = pantryRecords.reduce((sum, r) => sum + (r.total_adults || 0), 0) / pantryRecords.length;
    const avgChildren = pantryRecords.reduce((sum, r) => sum + (r.total_children || 0), 0) / pantryRecords.length;
    const avgSeniors = pantryRecords.reduce((sum, r) => sum + (r.total_seniors || 0), 0) / pantryRecords.length;

    return {
      totalFirstTime,
      totalReturning,
      totalHouseholds: totalFirstTime + totalReturning,
      totalPounds: totalPounds.toFixed(2),
      avgAdults: avgAdults.toFixed(1),
      avgChildren: avgChildren.toFixed(1),
      avgSeniors: avgSeniors.toFixed(1),
      totalRecords: pantryRecords.length
    };
  };

  const stats = calculateStats();

  if (pantryLoading) {
    return (
      <div className="hub-container">
        <div className="table-loading">Loading pantry reports...</div>
      </div>
    );
  }

  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Pantry Distribution - Reports & Analytics</h2>
        <div className="department-actions">
          <Link to="/pantry/weekly">Data Entry</Link>
          <Link to="/pantry/reports" className="active">Reports</Link>
        </div>
      </div>

      {stats ? (
        <>
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Total Households</h5>
                  <p className="display-4">{stats.totalHouseholds}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">First-Time</h5>
                  <p className="display-4">{stats.totalFirstTime}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Returning</h5>
                  <p className="display-4">{stats.totalReturning}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Total Pounds</h5>
                  <p className="display-4">{stats.totalPounds}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Avg Adults/Week</h5>
                  <p className="display-4">{stats.avgAdults}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Avg Children/Week</h5>
                  <p className="display-4">{stats.avgChildren}</p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Avg Seniors/Week</h5>
                  <p className="display-4">{stats.avgSeniors}</p>
                </div>
              </div>
            </div>
          </div>

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
                  <th className="col-number">Pounds</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="table-empty">
          No pantry records available. Add some records to see reports.
        </div>
      )}
    </div>
  );
}