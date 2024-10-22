// src/HackedTerminal.js
import React, { useState, useEffect } from "react";
import "./HackedTerminal.css";

const HackedTerminal = () => {
  const [displayText, setDisplayText] = useState("");
  const commands = [
    "Initializing hack...",
    "Bypassing firewall...",
    "Accessing secure database...",
    "Decrypting files...",
    "Transfer complete.",
    "You now have full access.",
  ];

  useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;
    const typeSpeed = 50;

    const typeCommand = () => {
      if (currentIndex < commands.length) {
        if (charIndex < commands[currentIndex].length) {
          setDisplayText(
            (prev) => prev + commands[currentIndex].charAt(charIndex)
          );
          charIndex++;
        } else {
          setDisplayText((prev) => prev + "\n");
          charIndex = 0;
          currentIndex++;
        }
      }
    };

    const typingInterval = setInterval(typeCommand, typeSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="terminal">
      <pre className="glitch">{displayText}</pre>
    </div>
  );
};

export default HackedTerminal;
