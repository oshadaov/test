// src/CriticalErrorLogs.js
import React from "react";
import "./CriticalErrorLogs.css";

const CriticalErrorLogs = () => {
  const errorMessages = [
    "CRITICAL ERROR: Memory leak detected.",
    "CRITICAL ERROR: Database corruption imminent.",
    "WARNING: Unauthorized data transfer detected.",
    "ALERT: Power grid compromised.",
    "SYSTEM FAILURE: Kernel panic.",
  ];

  return (
    <div className="error-logs">
      <h3>Error Logs:</h3>
      <ul>
        {errorMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default CriticalErrorLogs;
