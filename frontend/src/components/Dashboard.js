// src/components/Dashboard.js
import React from 'react';
import './Dashboard.css'; // Import CSS

function Dashboard({ totalSpend }) {
  return (
    <div className="dashboard">
      <h2>Total Spend</h2>
      <div className="total-spend">Rs {totalSpend}</div>

      <div className="categories">
        <div className="category-card">
          <div className="icon">🎬</div>
          <h3>Entertainment</h3>
          <p>$1239</p>
        </div>
        <div className="category-card">
          <div className="icon">⛽</div>
          <h3>Food</h3>
          <p>Rs 342</p>
        </div>
        <div className="category-card">
          <div className="icon">🛒</div>
          <h3>Groceries</h3>
          <p>Rs 218</p>
        </div>
        <div className="category-card">
          <div className="icon">✈️</div>
          <h3>Travel</h3>
          <p>Rs 892</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
