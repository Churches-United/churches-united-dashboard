import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function HousingOccupancyBar({ records = [] }) {
  const buildings = Array.from(new Set(records.map((r) => r.building_name)));

  // X-axis labels = months
  const labels = Array.from(
    new Set(
      records
        .map((r) => new Date(r.month_start).toLocaleString("default", { month: "short", year: "numeric" }))
    )
  );

  // Each building gets a dataset
  const datasets = buildings.map((building, idx) => {
    const buildingRecords = records
      .filter((r) => r.building_name === building)
      .sort((a, b) => new Date(a.month_start) - new Date(b.month_start));

    return {
      label: building,
      data: labels.map((monthLabel) => {
        const record = buildingRecords.find(
          (r) =>
            new Date(r.month_start).toLocaleString("default", { month: "short", year: "numeric" }) ===
            monthLabel
        );
        return record ? Number(record.occupancy_percent) : 0;
      }),
      backgroundColor: idx === 0 ? "#1c71a6" : "#03a696",
    };
  });

  const data = { labels, datasets };

  const options = {
    responsive: true,
    plugins: {
      title: { display: true, text: "Occupancy % by Building", font: { size: 18 } },
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true, max: 100, title: { display: true, text: "Occupancy (%)" } },
    },
  };

  return <Bar data={data} options={options} />;
}
