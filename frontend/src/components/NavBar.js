import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-gray-900 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="text-white">
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-3xl font-bold">Expense Tracker</Link>
          </div>
          <div>
          <Link to="/HomePage" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              HomePage
            </Link>
            <Link to="/DailyExpenses" className="text-gray-300 hover:text-white px-3 py-2 rounded-lg text-base font-medium">
              Daily Expenses
            </Link>
            <Link to="/signup" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              Sign Up
            </Link>
            <Link to="/signin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
