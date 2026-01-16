import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function MonthlyVolunteerYoYChart({
  reports = [],
  monthsToShow = 6,
}) {
  if (!reports.length) return null;

  const now = new Date();
  const currentYear = now.getFullYear();
  const compareYear = currentYear - 1;
  const compareYearTwo = currentYear - 2;

  // Get last N month numbers (0–11)
  const monthIndexes = Array.from({ length: monthsToShow })
    .map((_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return d.getMonth();
    })
    .reverse();

  const monthLabels = monthIndexes.map((m) =>
    new Date(0, m).toLocaleString("en-US", { month: "short" })
  );

  const getYearData = (year) =>
    monthIndexes.map((month) => {
      const row = reports.find((r) => {
        const d = new Date(r.month_start);
        return d.getFullYear() === year && d.getMonth() === month;
      });
      return row ? Number(row.total_volunteers) : 0;
    });

  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        label: `${compareYearTwo}`,
        data: getYearData(compareYearTwo),
        borderColor: "#1c71a6",
        backgroundColor: "rgba(148,163,184,0.15)",
        tension: 0.35,
        fill: false,
        pointRadius: 4,
      },
      {
        label: `${compareYear}`,
        data: getYearData(compareYear),
        borderColor: "#03a696",
        backgroundColor: "rgba(148,163,184,0.15)",
        tension: 0.35,
        fill: false,
        pointRadius: 4,
      },
      // {
      //   label: `${currentYear}`,
      //   data: getYearData(currentYear),
      //   borderColor: "#2563eb",
      //   backgroundColor: "rgba(37,99,235,0.15)",
      //   tension: 0.35,
      //   fill: false,
      //   pointRadius: 4,
      // },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  };

  return (
    <div
      style={{
        height: 280,
        background: "#fff",
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
}
