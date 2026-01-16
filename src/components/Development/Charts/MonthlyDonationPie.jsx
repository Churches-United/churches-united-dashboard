// MonthlyDonationPie.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MonthlyDonationPie({ restricted = 0, unrestricted = 0 }) {
  const data = {
    labels: ["Restricted", "Unrestricted"],
    datasets: [
      {
        label: "Donation Composition (Last 6 Months)",
        data: [restricted, unrestricted],
        backgroundColor: ["#ffc107", "#007bff"],
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            const total = restricted + unrestricted;
            const percent = total ? ((value / total) * 100).toFixed(1) : 0;
            return `${context.label}: $${value.toLocaleString()} (${percent}%)`;
          },
        },
      },
      title: { display: true, text: "Donation Composition (Last 6 Months)" },
    },
  };

  return <Pie data={data} options={options} />;
}
