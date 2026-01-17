import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
//import ChartDataLabels from "chartjs-plugin-datalabels";

// Only register core elements, NOT ChartDataLabels globally
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function MonthlyDonationPie({ restricted = 0, unrestricted = 0 }) {
  const data = {
    labels: ["Restricted", "Unrestricted"],
    datasets: [
      {
        data: [restricted, unrestricted],
        backgroundColor: ["#03a696", "#1c71a6"],
        hoverBackgroundColor: ["#2a5754", "#04b2d9"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Donations Breakdown (Last 6 Months)",
        font: { size: 16, weight: "bold" },
      },
      legend: {
        display: true,
        position: "bottom",
      },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 14 },
        formatter: (value) => `$${value.toLocaleString()}`, // show actual number
      },
    },
  };

  return <Pie data={data} options={options} plugins={[ChartDataLabels]} />;
}
