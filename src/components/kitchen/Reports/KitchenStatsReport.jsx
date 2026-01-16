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

export default function KitchenStatsReport({ filters }) {
  const kitchenRecords = useStore((state) => state.kitchenRecords);
  const fetchKitchenRecords = useStore((state) => state.fetchKitchenRecords);
  const kitchenLoading = useStore((state) => state.kitchenLoading);

  useEffect(() => {
    fetchKitchenRecords();
  }, [fetchKitchenRecords]);

  // Calculate stats
  const stats = useMemo(() => {
    if (!kitchenRecords || kitchenRecords.length === 0) {
      return {
        totalMeals: 0,
        avgMealsPerWeek: 0,
        recordsTracked: 0,
        highestWeek: 0,
        lowestWeek: 0,
      };
    }

    const totalMeals = kitchenRecords.reduce(
      (sum, r) => sum + (r.total_meals_served || 0),
      0
    );
    const mealsArray = kitchenRecords.map((r) => r.total_meals_served || 0);

    return {
      totalMeals,
      avgMealsPerWeek: Math.round(totalMeals / kitchenRecords.length),
      recordsTracked: kitchenRecords.length,
      highestWeek: Math.max(...mealsArray),
      lowestWeek: Math.min(...mealsArray),
    };
  }, [kitchenRecords]);

  // Line chart data (trend over time)
  const lineChartData = useMemo(() => {
    if (!kitchenRecords) return null;

    const sorted = [...kitchenRecords]
      .filter((r) => {
        if (filters.year) {
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
          label: "Meals Served",
          data: sorted.map((r) => r.total_meals_served),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          tension: 0.1,
        },
      ],
    };
  }, [kitchenRecords, filters.year]);

  // Pie chart data (distribution)
  const pieChartData = useMemo(() => {
    if (!kitchenRecords) return null;

    const ranges = {
      "0-500": 0,
      "501-1000": 0,
      "1001-1500": 0,
      "1501+": 0,
    };

    kitchenRecords.forEach((r) => {
      const meals = r.total_meals_served || 0;
      if (meals <= 500) ranges["0-500"]++;
      else if (meals <= 1000) ranges["501-1000"]++;
      else if (meals <= 1500) ranges["1001-1500"]++;
      else ranges["1501+"]++;
    });

    return {
      labels: Object.keys(ranges),
      datasets: [
        {
          label: "Weeks by Meal Count",
          data: Object.values(ranges),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
        },
      ],
    };
  }, [kitchenRecords]);

  if (kitchenLoading) return <p>Loading statistics...</p>;

  return (
    <div>
      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Meals Served</h5>
              <h2 className="text-primary">{numberFormatter.format(stats.totalMeals)}</h2>
              <p className="text-muted">All time total</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Average Per Week</h5>
              <h2 className="text-success">{numberFormatter.format(stats.avgMealsPerWeek)}</h2>
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

      {/* Charts */}
      <div className="row g-4">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>Meals Served Trend</h5>
            </div>
            <div className="card-body">
              {lineChartData && <Line data={lineChartData} />}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Distribution by Meal Count</h5>
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
