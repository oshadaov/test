import React, { useEffect, useState } from 'react';
import './DailyExpensesOverview.css';
import { FaUtensils, FaPills, FaShoppingCart } from 'react-icons/fa';

const DailyExpensesOverview = ({ data = [], dailyMax = 4000 }) => {
  const [categoryTotals, setCategoryTotals] = useState({ Food: 0, Drugs: 0, Others: 0 });
  const [todayTotal, setTodayTotal] = useState(0);
  const [percentageSpent, setPercentageSpent] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const totals = { Food: 0, Drugs: 0, Others: 0 };

    data.forEach(expense => {
      if (expense.date === today) {
        const category = expense.category || 'Others';
        if (totals[category] !== undefined) {
          totals[category] += expense.amount;
        }
      }
    });

    const totalSpent = Object.values(totals).reduce((sum, value) => sum + value, 0);
    const percentage = (totalSpent / dailyMax) * 100;

    setCategoryTotals(totals);
    setTodayTotal(totalSpent);
    setPercentageSpent(percentage);
  }, [data, dailyMax]);

  const icons = { Food: <FaUtensils />, Drugs: <FaPills />, Others: <FaShoppingCart /> };

  return (
    <div className="overview-container">
      <h3>Daily Expenses Overview</h3>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${percentageSpent}%` }}>
          {Math.round(percentageSpent)}% of Rs{dailyMax} spent
        </div>
      </div>
      <div className="expense-list">
        {Object.keys(categoryTotals).map(category => (
          <div key={category} className="expense-item">
            <div className="expense-icon">{icons[category]}</div>
            <div className="expense-details">
              <span className="expense-category">{category}</span>
              <span className="expense-amount">Rs{categoryTotals[category]}</span>
            </div>
          </div>
        ))}
      </div>
      {todayTotal > dailyMax && (
        <p className="warning-message">Warning: You have exceeded the daily limit of Rs{dailyMax}!</p>
      )}
    </div>
  );
};

export default DailyExpensesOverview;
