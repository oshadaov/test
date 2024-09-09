
import React from 'react';
import './NavBar.css';
import Logo from '../assests/chary-logo.png'
import { Link } from 'react-router-dom';
function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Meras Group Logo" />
      </div>
      <ul className="nav-links">
      <li><Link to='/home'>Home</Link></li>
      <li><Link to='/home'>About</Link></li>
      <li><Link to='/home'>Contact</Link></li>
      <li><Link to='/login'>Log In</Link></li>
      <li><Link to='/signup'>Sign Up</Link></li>
       
      </ul>
    </nav>
  );
}

export default NavBar;
