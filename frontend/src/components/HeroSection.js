// src/components/HeroSection.js
import React from 'react';
import './HeroSection.css';
import Img from '../assests/img.jpg'
function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>WELCOME TO OUR <span>COMPANY</span></h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button className="cta-btn">GET STARTED</button>
      </div>
      <div className='right'>
        <img src={Img} alt="Camera"/>
      </div>
    </div>
  );
}

export default HeroSection;
