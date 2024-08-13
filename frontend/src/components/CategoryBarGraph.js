import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CategoryBarGraph = ({ data }) => {
  // Aggregate expenditures by category
  const categoryTotals = {
    Food: 0,
    Drugs: 0,
    Others: 0,
  };

  data.forEach(expense => {
    if (categoryTotals.hasOwnProperty(expense.category)) {
      categoryTotals[expense.category] += expense.amount;
    }
  });

  const categories = Object.keys(categoryTotals);
  const totals = Object.values(categoryTotals);

  // Define colors for each category
  const colors = {
    Food: '#3498db',  // Blue
    Drugs: '#e74c3c',  // Red
    Others: '#2ecc71',  // Green
  };

  const chartData = {
    labels: categories,  // Categories as labels on x-axis
    datasets: [
      {
        label: 'Expenditure by Category',
        data: totals,  // Totals as data points on y-axis
        backgroundColor: categories.map(category => colors[category]),
        borderColor: categories.map(category => colors[category]),
        borderWidth: 1,
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
        text: 'Expenditure by Category',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Category',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (rs)',
        },
      },
    },
  };

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CategoryBarGraph;
