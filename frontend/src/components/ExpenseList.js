// src/components/ExpenseList.js
import React from 'react';
import './ExpenseList.css';

const ExpenseList = ({ expenses, onDeleteExpense, onEditClick }) => {
  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.description} - Rs{expense.amount} - {expense.category}
            <button onClick={() => onEditClick(expense)}>Edit</button>
            <button onClick={() => onDeleteExpense(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
