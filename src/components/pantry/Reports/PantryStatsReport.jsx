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

export default function PantryStatsReport({ filters }) {
  const pantryRecords = useStore((state) => state.pantryRecords);
  const fetchPantryRecords = useStore((state) => state.fetchPantryRecords);
  const pantryLoading = useStore((state) => state.pantryLoading);

  useEffect(() => {
    fetchPantryRecords();
  }, [fetchPantryRecords]);

  const stats = useMemo(() => {
    if (!pantryRecords || pantryRecords.length === 0) {
      return {
        totalHouseholds: 0,
        totalFirstTime: 0,
        totalReturning: 0,
        totalPounds: 0,
        avgPoundsPerWeek: 0,
        recordsTracked: 0,
      };
    }

    const totalFirstTime = pantryRecords.reduce(
      (sum, r) => sum + (r.first_time_households || 0),
      0
    );
    const totalReturning = pantryRecords.reduce(
      (sum, r) => sum + (r.returning_households || 0),
      0
    );
    const totalPounds = pantryRecords.reduce(
      (sum, r) => sum + (parseFloat(r.total_pounds_distributed) || 0),
      0
    );

    return {
      totalHouseholds: totalFirstTime + totalReturning,
      totalFirstTime,
      totalReturning,
      totalPounds: totalPounds.toFixed(2),
      avgPoundsPerWeek: (totalPounds / pantryRecords.length).toFixed(2),
      recordsTracked: pantryRecords.length,
    };
  }, [pantryRecords]);

  const lineChartData = useMemo(() => {
    if (!pantryRecords) return null;

    const sorted = [...pantryRecords]
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
          label: "Total Pounds Distributed",
          data: sorted.map((r) => parseFloat(r.total_pounds_distributed) || 0),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.1,
        },
      ],
    };
  }, [pantryRecords, filters?.year]);

  const pieChartData = useMemo(() => {
    if (!pantryRecords) return null;

    const totalFirstTime = pantryRecords.reduce(
      (sum, r) => sum + (r.first_time_households || 0),
      0
    );
    const totalReturning = pantryRecords.reduce(
      (sum, r) => sum + (r.returning_households || 0),
      0
    );

    return {
      labels: ["First-Time Households", "Returning Households"],
      datasets: [
        {
          label: "Household Distribution",
          data: [totalFirstTime, totalReturning],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
          ],
        },
      ],
    };
  }, [pantryRecords]);

  if (pantryLoading) return <p>Loading statistics...</p>;

  return (
    <div>
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Households Served</h5>
              <h2 className="text-primary">{numberFormatter.format(stats.totalHouseholds)}</h2>
              <p className="text-muted">All time total</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Pounds Distributed</h5>
              <h2 className="text-success">{numberFormatter.format(stats.totalPounds)}</h2>
              <p className="text-muted">All time total</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Avg Pounds Per Week</h5>
              <h2 className="text-info">{numberFormatter.format(stats.avgPoundsPerWeek)}</h2>
              <p className="text-muted">Average distribution</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">First-Time Households</h5>
              <h2 className="text-warning">{numberFormatter.format(stats.totalFirstTime)}</h2>
              <p className="text-muted">New to pantry</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Returning Households</h5>
              <h2 className="text-secondary">{numberFormatter.format(stats.totalReturning)}</h2>
              <p className="text-muted">Repeat visitors</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>Pounds Distributed Trend</h5>
            </div>
            <div className="card-body">
              {lineChartData && <Line data={lineChartData} />}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Household Types</h5>
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
