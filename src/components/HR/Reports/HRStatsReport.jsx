import useStore from "../../../zustand/store";
import { useEffect, useMemo } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const numberFormatter = new Intl.NumberFormat("en-US");

export default function HRStatsReport({ filters }) {
  const hrRecords = useStore((state) => state.hrRecords);
  const fetchHRRecords = useStore((state) => state.fetchHRRecords);
  const hrLoading = useStore((state) => state.hrLoading);

  useEffect(() => {
    fetchHRRecords();
  }, [fetchHRRecords]);

  const stats = useMemo(() => {
    if (!hrRecords || hrRecords.length === 0) {
      return {
        totalHires: 0,
        totalTurnover: 0,
        avgOpenPositions: 0,
        avgTotalPositions: 0,
        recordsTracked: 0,
      };
    }

    const totalHires = hrRecords.reduce(
      (sum, r) => sum + (r.new_hires_this_week || 0),
      0
    );
    const totalTurnover = hrRecords.reduce(
      (sum, r) => sum + (r.employee_turnover || 0),
      0
    );
    const avgOpen = hrRecords.reduce(
      (sum, r) => sum + (r.open_positions || 0),
      0
    ) / hrRecords.length;
    const avgTotal = hrRecords.reduce(
      (sum, r) => sum + (r.total_positions || 0),
      0
    ) / hrRecords.length;

    return {
      totalHires,
      totalTurnover,
      avgOpenPositions: avgOpen.toFixed(1),
      avgTotalPositions: avgTotal.toFixed(1),
      recordsTracked: hrRecords.length,
    };
  }, [hrRecords]);

  const lineChartData = useMemo(() => {
    if (!hrRecords) return null;

    const sorted = [...hrRecords]
      .filter((r) => {
        if (filters?.year) {
          const year = new Date(r.week_date).getFullYear();
          return year === Number(filters.year);
        }
        return true;
      })
      .sort((a, b) => new Date(a.week_date) - new Date(b.week_date));

    return {
      labels: sorted.map((r) =>
        new Date(r.week_date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      ),
      datasets: [
        {
          label: "New Hires",
          data: sorted.map((r) => r.new_hires_this_week || 0),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.1,
        },
        {
          label: "Turnover",
          data: sorted.map((r) => r.employee_turnover || 0),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          tension: 0.1,
        },
      ],
    };
  }, [hrRecords, filters?.year]);

  const pieChartData = useMemo(() => {
    if (!hrRecords || hrRecords.length === 0) return null;

    const latestRecord = hrRecords[0];
    const filled = (latestRecord.total_positions || 0) - (latestRecord.open_positions || 0);
    const open = latestRecord.open_positions || 0;

    return {
      labels: ["Filled Positions", "Open Positions"],
      datasets: [
        {
          label: "Position Status",
          data: [filled, open],
          backgroundColor: [
            "rgba(75, 192, 192, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    };
  }, [hrRecords]);

  if (hrLoading) return <p>Loading statistics...</p>;

  return (
    <div>
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Hires</h5>
              <h2 className="text-primary">{numberFormatter.format(stats.totalHires)}</h2>
              <p className="text-muted">All time total</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Turnover</h5>
              <h2 className="text-danger">{numberFormatter.format(stats.totalTurnover)}</h2>
              <p className="text-muted">All time total</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Avg Open Positions</h5>
              <h2 className="text-warning">{stats.avgOpenPositions}</h2>
              <p className="text-muted">Average per week</p>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Avg Total Positions</h5>
              <h2 className="text-info">{stats.avgTotalPositions}</h2>
              <p className="text-muted">Average per week</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>Hiring & Turnover Trend</h5>
            </div>
            <div className="card-body">
              {lineChartData && <Line data={lineChartData} />}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Position Status (Latest)</h5>
            </div>
            <div className="card-body">
              {pieChartData && <Pie data={pieChartData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
