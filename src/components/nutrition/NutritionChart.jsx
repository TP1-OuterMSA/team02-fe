// NutritionChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NutritionChart = ({labels, carbData, proteinData, fatData}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: '탄수화물',
        data: carbData,
        backgroundColor: 'rgba(24, 20, 243, 1)',
        borderRadius: 20,
        barPercentage: 0.7,
      },
      {
        label: '단백질',
        data: proteinData,
        backgroundColor: 'rgba(7, 97, 90, 1)',
        borderRadius: 20,
        barPercentage: 0.7,
      },
      {
        label: '지방',
        data: fatData,
        backgroundColor: 'rgba(22, 219, 204, 1)',
        borderRadius: 20,
        barPercentage: 0.7,
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
            color: '#718EBF'
          },
          padding: 10,
          boxWidth: 10,  // 범례 아이콘 크기
          boxHeight: 10, // 범례 아이콘 높이
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
          callback: function (val, index) {
            return this.getLabelForValue(index).replace('\n', '\n'); // 줄바꿈
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
    <div style={{ width: '100%', height: '280px', padding: '0 20px 0 20px'}}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default NutritionChart;
