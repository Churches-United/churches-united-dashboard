import React, { useEffect } from 'react';
import useStore from '../../zustand/store';

export default function HRReports() {
  const hrRecords = useStore((state) => state.hrRecords);
  const hrLoading = useStore((state) => state.hrLoading);
  const fetchHRRecords = useStore((state) => state.fetchHRRecords);

  useEffect(() => {
    fetchHRRecords();
  }, [fetchHRRecords]);

  const calculateStats = () => {
    if (hrRecords.length === 0) return null;

    const totalHires = hrRecords.reduce((sum, r) => sum + (r.new_hires_this_week || 0), 0);
    const totalTurnover = hrRecords.reduce((sum, r) => sum + (r.employee_turnover || 0), 0);
    const avgOpenPositions = hrRecords.reduce((sum, r) => sum + (r.open_positions || 0), 0) / hrRecords.length;
    const avgTotalPositions = hrRecords.reduce((sum, r) => sum + (r.total_positions || 0), 0) / hrRecords.length;

    return {
      totalHires,
      totalTurnover,
      avgOpenPositions: avgOpenPositions.toFixed(1),
      avgTotalPositions: avgTotalPositions.toFixed(1),
      totalRecords: hrRecords.length
    };
  };

  const stats = calculateStats();

  if (hrLoading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Human Resources Reports</h1>

      {stats ? (
        <>
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Total Hires</h5>
                  <p className="display-4">{stats.totalHires}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Total Turnover</h5>
                  <p className="display-4">{stats.totalTurnover}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Avg Open Positions</h5>
                  <p className="display-4">{stats.avgOpenPositions}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card text-center">
                <div className="card-body">
                  <h5 className="card-title">Avg Total Positions</h5>
                  <p className="display-4">{stats.avgTotalPositions}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Weekly HR Data</h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Week Date</th>
                      <th>Total Positions</th>
                      <th>Open Positions</th>
                      <th>New Hires</th>
                      <th>Turnover</th>
                      <th>Evaluations Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hrRecords.map((record) => (
                      <tr key={record.id}>
                        <td>{new Date(record.week_date).toLocaleDateString()}</td>
                        <td>{record.total_positions}</td>
                        <td>{record.open_positions}</td>
                        <td>{record.new_hires_this_week}</td>
                        <td>{record.employee_turnover}</td>
                        <td>{record.evaluations_due}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="alert alert-info">
          No HR records available. Add some records to see reports.
        </div>
      )}
    </div>
  );
}