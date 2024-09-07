// src/components/Footer.js
import React from "react";
import "./Footer.css";
import Profile from "../assests/chary-logo.png"; // Replace with actual logo

function Footer() {
  return (
    <footer className="footer">
      <img src={Profile} alt="Chary logo" className="footer-logo" />
      <div className="icon-button">
        <img src={Profile} alt="Camera" />
      </div>
    </footer>
  );
}

export default Footer;
