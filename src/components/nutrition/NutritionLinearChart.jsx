// NutritionChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2'; // Line 컴포넌트로 교체
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// 필수 요소 등록 (BarElement → LineElement, PointElement)
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const NutritionLinearChart = ({ labels, carbData, proteinData, fatData }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: '탄수화물',
        data: carbData,
        borderColor: 'rgba(24, 20, 243, 1)',
        backgroundColor: 'rgba(24, 20, 243, 0.2)',
        tension: 0.4,
        pointRadius: 4,
        fill: true,
      },
      {
        label: '단백질',
        data: proteinData,
        borderColor: 'rgba(7, 97, 90, 1)',
        backgroundColor: 'rgba(7, 97, 90, 0.2)',
        tension: 0.4,
        pointRadius: 4,
        fill: true,
      },
      {
        label: '지방',
        data: fatData,
        borderColor: 'rgba(22, 219, 204, 1)',
        backgroundColor: 'rgba(22, 219, 204, 0.2)',
        tension: 0.4,
        pointRadius: 4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          font: {
            size: 14,
            color: '#718EBF',
          },
          padding: 10,
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '280px', padding: '0 20px 0 20px' }}>
      <Line data={data} options={options} /> {/* Line으로 변경 */}
    </div>
  );
};

export default NutritionLinearChart;
