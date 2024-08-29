import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Simplified function to prepare chart data
const prepareChartData = (data, totalBudget) => {
  let cumulative = 0;
  const cumulativeData = [];
  const remainingBudgetData = [];

  data.forEach(expense => {
    cumulative += expense.amount;
    cumulativeData.push(cumulative);
    remainingBudgetData.push(totalBudget - cumulative);
  });

  return {
    labels: data.map(expense => expense.date), // Dates on x-axis
    datasets: [
      {
        label: 'Cumulative Expenses',
        data: cumulativeData, // Cumulative expenses data points
        backgroundColor: '#2980b9',
        borderColor: '#3498db',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Remaining Budget',
        data: remainingBudgetData, // Remaining budget data points
        backgroundColor: '#e74c3c',
        borderColor: '#e74c3c',
        fill: false,
        tension: 0.1,
      },
    ],
  };
};

const ExpenseGraph = ({ data, totalBudget = 4000 }) => {
  const chartData = prepareChartData(data, totalBudget);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Cumulative Expenses and Remaining Budget',
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
        beginAtZero: true,
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
