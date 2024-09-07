
import React from 'react';
import './NavBar.css';
import Logo from '../assests/chary-logo.png'
function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Meras Group Logo" />
      </div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">Log In</a></li>
        <li><a href="#">Sign Up</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;
