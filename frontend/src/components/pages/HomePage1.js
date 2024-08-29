// src/components/HomePage.js
import React from 'react';
import './HomePage1.css';

const HomePage1 = () => {
  return (
    <div className="homepage-container">
    

      <header className="hero-section">
        <div className="hero-content">
          <h2>Track Your Expenses Effortlessly</h2>
          <p>Manage your spending, track your budgets, and gain control over your finances all in one place.</p>
          <div className="cta-buttons">
            <button className="primary-btn">Get Started</button>
            <button className="secondary-btn">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <img src="../../assests/ss.png" alt="Dashboard preview" />
        </div>
      </header>

      <section className="features-section" id="features">
        <h3>Features</h3>
        <div className="features">
          <div className="feature-item">
            <h4>Track Spending</h4>
            <p>Easily categorize and track your daily spending.</p>
          </div>
          <div className="feature-item">
            <h4>Manage Budgets</h4>
            <p>Set up budgets and monitor your progress with ease.</p>
          </div>
          <div className="feature-item">
            <h4>Detailed Reports</h4>
            <p>Generate detailed reports to gain insights into your spending patterns.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2024 Expense Tracker. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage1;
