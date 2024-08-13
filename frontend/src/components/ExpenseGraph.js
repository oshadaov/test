import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Helper function to calculate cumulative expenses
const getCumulativeData = (data) => {
  let cumulative = 0;
  return data.map(expense => {
    cumulative += expense.amount;
    return cumulative;
  });
};

const ExpenseGraph = ({ data }) => {
  // Calculate cumulative expenses
  const cumulativeData = getCumulativeData(data);

  // Prepare the data for the chart
  const chartData = {
    labels: data.map(expense => expense.date), // Dates as labels on x-axis
    datasets: [
      {
        label: 'Cumulative Expenses',
        data: cumulativeData, // Use cumulative data points on y-axis
        fill: false,
        backgroundColor: '#2980b9',
        borderColor: '#3498db',
        tension: 0.1, // Smooth the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cumulative Expenses Over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true, // Start y-axis at 0
        title: {
          display: true,
          text: 'Amount (Rs)',
        },
      },
    },
  };

  return (
    <div className="graph-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ExpenseGraph;
