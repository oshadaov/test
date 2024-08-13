import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './ExpenseCircleWarning.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseCircleWarning = ({ data, dailyMax = 4000 }) => {
  // Calculate today's total expenses
  const dailyTotals = data.reduce((acc, expense) => {
    const date = expense.date;
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += expense.amount;
    return acc;
  }, {});

  // Get today's date (assuming data is in 'YYYY-MM-DD' format)
  const today = new Date().toISOString().split('T')[0];
  const todayTotal = dailyTotals[today] || 0; // Get the total for today or 0 if none

  const chartData = {
    labels: ['Spent', 'Remaining'],
    datasets: [
      {
        label: 'Daily Expenses',
        data: [todayTotal, Math.max(0, dailyMax - todayTotal)], // Ensure remaining is not negative
        backgroundColor: [
          todayTotal > dailyMax ? '#e74c3c' : '#3498db', // Red if exceeded, blue otherwise
          '#ecf0f1',
        ],
        hoverBackgroundColor: [
          todayTotal > dailyMax ? '#c0392b' : '#2980b9',
          '#bdc3c7',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '70%',
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: Rs${tooltipItem.raw}`;
          },
        },
      },
      legend: {
        display: true,
        position: 'bottom',
      },
    },
  };

  return (
    <div className="warning-container">
      <div className="doughnut-chart-container">
        <Doughnut data={chartData} options={options} />
      </div>
      {todayTotal > dailyMax && (
        <p className="warning-message">
          Warning: You have exceeded the daily limit of ${dailyMax}!
        </p>
      )}
    </div>
  );
};

export default ExpenseCircleWarning;
