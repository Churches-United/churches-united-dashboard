import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
      <div className="hub-container">
        <div className="table-loading">Loading HR reports...</div>
      </div>
    );
  }

  return (
    <div className="hub-container">
      <div className="department-header">
        <h2>Human Resources - Reports & Analytics</h2>
        <div className="department-actions">
          <Link to="/hr/weekly">Data Entry</Link>
          <Link to="/hr/reports" className="active">Reports</Link>
        </div>
      </div>

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

          <div className="table-container">
            <table className="table-app">
              <thead>
                <tr>
                  <th>Week Date</th>
                  <th className="col-number">Total Positions</th>
                  <th className="col-number">Open Positions</th>
                  <th className="col-number">New Hires</th>
                  <th className="col-number">Turnover</th>
                  <th className="col-number">Evaluations Due</th>
                </tr>
              </thead>
              <tbody>
                {hrRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{new Date(record.week_date).toLocaleDateString()}</td>
                    <td className="col-number">{record.total_positions}</td>
                    <td className="col-number">{record.open_positions}</td>
                    <td className="col-number">{record.new_hires_this_week}</td>
                    <td className="col-number">{record.employee_turnover}</td>
                    <td className="col-number">{record.evaluations_due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="table-empty">
          No HR records available. Add some records to see reports.
        </div>
      )}
    </div>
  );
}