// src/CountdownTimer.js
import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";

const CountdownTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <div className="countdown">
      <h2>Self-Destruction in: {secondsLeft}s</h2>
    </div>
  );
};

export default CountdownTimer;
