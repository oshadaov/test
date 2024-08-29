import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './ExpenseCircleWarning.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseCircleWarning = ({ data, dailyMax = 4000 }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Aggregate today's expenses by category
    const today = new Date().toISOString().split('T')[0];
    const categoryTotals = {
      Food: 0,
      Drugs: 0,
      Others: 0,
    };

    data.forEach(expense => {
      if (expense.date === today) {
        const category = expense.category || 'Others';
        if (categoryTotals[category] !== undefined) {
          categoryTotals[category] += expense.amount;
        } else {
          categoryTotals['Others'] += expense.amount;
        }
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

    setChartData({
      labels: categories,
      datasets: [
        {
          label: 'Daily Expenses',
          data: totals,
          backgroundColor: categories.map(category => colors[category]),
          hoverBackgroundColor: categories.map(category => colors[category]),
          borderWidth: 1,
        },
      ],
    });
  }, [data]);

  const todayTotal = chartData.datasets[0]?.data.reduce((a, b) => a + b, 0) || 0;

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
        {chartData.labels.length > 0 && <Doughnut data={chartData} options={options} />}
      </div>
      <p className="summary-message">
        {`Total Spent Today: Rs${todayTotal} / Rs${dailyMax}`}
      </p>
      {todayTotal > dailyMax && (
        <p className="warning-message">
          Warning: You have exceeded the daily limit of Rs{dailyMax}!
        </p>
      )}
    </div>
  );
};

export default ExpenseCircleWarning;
