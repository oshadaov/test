// src/VirusUpload.js
import React, { useState, useEffect } from "react";
import "./VirusUpload.css";

const VirusUpload = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const upload = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 100);

    return () => clearInterval(upload);
  }, []);

  return (
    <div className="virus-upload">
      <h3>Uploading Virus...</h3>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default VirusUpload;
