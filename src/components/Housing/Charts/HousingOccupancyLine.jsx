// src/components/Housing/Charts/HousingOccupancyLine.jsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default function HousingOccupancyLine({ records = [] }) {
  // Get all unique building names
  const buildings = Array.from(new Set(records.map((r) => r.building_name)));

  // Prepare datasets for each building
  const datasets = buildings.map((building, idx) => {
    const buildingRecords = records
      .filter((r) => r.building_name === building)
      .sort((a, b) => new Date(a.month_start) - new Date(b.month_start));

    return {
      label: building,
      data: buildingRecords.map((r) => r.occupancy_percent),
      borderColor: idx === 0 ? "#1c71a6" : "#03a696",
      backgroundColor: "transparent",
      tension: 0.3,
    };
  });

  // X-axis labels
  const labels = Array.from(
    new Set(
      records.map((r) =>
        new Date(r.month_start).toLocaleString("default", {
          month: "short",
          year: "numeric",
        })
      )
    )
  );

  const data = { labels, datasets };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Occupancy % by Building",
        font: { size: 18 },
      },
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: "Occupancy (%)" },
      },
    },
  };

  return <Line data={data} options={options} />;
}
