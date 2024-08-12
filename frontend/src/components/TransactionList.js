// src/components/TransactionList.js
import React from 'react';

const TransactionList = ({ transactions, deleteTransaction }) => {
  return (
    <ul className="list">
      {transactions.map(transaction => (
        <li key={transaction.id} className={transaction.amount < 0 ? 'minus' : 'plus'}>
          {transaction.text} <span>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</span>
          <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
