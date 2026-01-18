import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function HousingOperationalReservesBar({ records = [] }) {
  if (!records.length) return null;

  // Most recent month
  const mostRecentMonth = records
    .map((r) => new Date(r.month_start))
    .sort((a, b) => b - a)[0];

  const monthData = records.filter(
    (r) =>
      new Date(r.month_start).getTime() === mostRecentMonth.getTime()
  );

  const labels = monthData.map((r) => r.building_name);
  const dataValues = monthData.map(
    (r) => Number(r.operational_reserves || 0)
  );

  const monthLabel = mostRecentMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const data = {
    labels,
    datasets: [
      {
        label: `Operational Reserves (${monthLabel})`,
        data: dataValues,
        borderRadius: 6,
        backgroundColor: ["#cfe2ff", "#1c71a6"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `$${Number(ctx.raw).toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) =>
            `$${(value / 1000).toFixed(0)}k`,
        },
      },
    },
  };

  return (
    <div className="chart-card housing">
      <h3 className="chart-title housing">
        Operational Reserves — {monthLabel}
      </h3>
      <div style={{ height: 300 }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
