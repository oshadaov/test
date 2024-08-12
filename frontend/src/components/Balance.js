// src/components/Balance.js
import React from 'react';

const Balance = ({ balance }) => {
  return (
    <div>
      <h2>Your Balance</h2>
      <h3>${balance.toFixed(2)}</h3>
    </div>
  );
};

export default Balance;
