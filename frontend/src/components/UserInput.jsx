// src/UserInput.js
import React, { useState } from "react";
import "./UserInput.css";

const UserInput = ({ onShutdown }) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleInput = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let response = "Command not recognized.";

    if (inputText.toLowerCase() === "status") {
      response = "All systems online.";
    } else if (inputText.toLowerCase() === "help") {
      response = "Available commands: status, help, shutdown";
    } else if (inputText.toLowerCase() === "shutdown") {
      response = "Shutting down...";
      // Trigger the shutdown action from props
      setTimeout(() => {
        onShutdown();
      }, 1000); // After 1 second, start the shutdown sequence
    }

    setOutputText(response);
    setInputText("");
  };

  return (
    <div className="user-input">
      <pre className="output">{outputText}</pre>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          placeholder="Enter command..."
          value={inputText}
          onChange={handleInput}
        />
        <button type="submit" className="submit-btn">Send</button>
      </form>
    </div>
  );
};

export default UserInput;
