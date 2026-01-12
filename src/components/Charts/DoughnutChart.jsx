import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function DoughnutChart({ data, options, title }) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
          weight: 600
        },
        padding: {
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12
      }
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '4px', maxWidth: '600px', margin: '0 auto' }}>
      <Doughnut data={data} options={{ ...defaultOptions, ...options }} />
    </div>
  );
}

export default DoughnutChart;