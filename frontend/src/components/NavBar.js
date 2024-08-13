import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="text-white">
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/signup" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Sign Up
            </Link>
            <Link to="/signin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
