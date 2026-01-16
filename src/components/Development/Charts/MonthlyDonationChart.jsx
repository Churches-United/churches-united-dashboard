import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const COLORS = ["#1c71a6", "#03a696", "#04b2d9", "#a60a33"]; 

export default function MonthlyDonationChart({ reports = [] }) {
  if (!reports.length) return <div>No data</div>;

  // Get all years in the data
  const years = Array.from(new Set(reports.map(r => new Date(r.month_start).getFullYear()))).sort();

  // Prepare datasets
  const datasets = years.map((year, i) => {
    const yearReports = reports
      .filter(r => new Date(r.month_start).getFullYear() === year)
      .sort((a, b) => new Date(a.month_start) - new Date(b.month_start))
      .slice(-6); // last 6 months of this year

    return {
      label: year.toString(),
      data: yearReports.map(r => r.total_amount ?? 0),
      borderColor: COLORS[i % COLORS.length],
      backgroundColor: "rgba(0,0,0,0)",
      tension: 0.3,
    };
  });

  // X-axis labels: union of months across all datasets
  const allLabels = Array.from(
    new Set(
      reports
        .sort((a, b) => new Date(a.month_start) - new Date(b.month_start))
        .slice(-6)
        .map(r =>
          new Date(r.month_start).toLocaleString("default", {
            month: "short",
            year: "numeric",
          })
        )
    )
  );

  const chartData = {
    labels: allLabels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
      title: { display: true, text: "Monthly Donations (Last 6 Months)" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => `$${value.toLocaleString()}`,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}
