import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../zustand/store';

export default function KitchenReports() {
  const { kitchenRecords, fetchKitchenRecords, kitchenLoading, kitchenError } = useStore();
  const [stats, setStats] = useState({
    totalMeals: 0,
    avgMealsPerWeek: 0,
    recordsTracked: 0
  });

  useEffect(() => {
    fetchKitchenRecords();
  }, [fetchKitchenRecords]);

  useEffect(() => {
    if (kitchenRecords && kitchenRecords.length > 0) {
      const totalMeals = kitchenRecords.reduce((sum, r) => sum + (r.total_meals_served || 0), 0);

      setStats({
        totalMeals,
        avgMealsPerWeek: (totalMeals / kitchenRecords.length).toFixed(0),
        recordsTracked: kitchenRecords.length
      });
    }
  }, [kitchenRecords]);

  if (kitchenLoading) {
    return <div className="container mt-4"><h3>Loading reports...</h3></div>;
  }

  if (kitchenError) {
    return <div className="container mt-4 alert alert-danger">{kitchenError}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Kitchen Reports & Analytics</h2>
        <Link to="/kitchen" className="btn btn-secondary">
          Back to Kitchen Home
        </Link>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Meals Served</h5>
              <h2 className="text-primary">{stats.totalMeals.toLocaleString()}</h2>
              <p className="text-muted">All time total</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Average Per Week</h5>
              <h2 className="text-success">{stats.avgMealsPerWeek}</h2>
              <p className="text-muted">Meals per week</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Records Tracked</h5>
              <h2 className="text-info">{stats.recordsTracked}</h2>
              <p className="text-muted">Weeks of data</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5>Recent Weekly Records</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Week Date</th>
                  <th>Total Meals Served</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {kitchenRecords?.slice(0, 10).map((record) => (
                  <tr key={record.id}>
                    <td>{new Date(record.week_date).toLocaleDateString()}</td>
                    <td>{record.total_meals_served}</td>
                    <td>{record.notes || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}