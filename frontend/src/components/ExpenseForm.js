// src/components/ExpenseForm.js
import React, { useState, useEffect } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ currentExpense, onAddExpense, onUpdateExpense }) => {
  const [expense, setExpense] = useState({ amount: '', description: '', category: 'Food' });

  useEffect(() => {
    if (currentExpense) {
      setExpense(currentExpense); // Populate the form with the selected expense to edit
    } else {
      setExpense({ amount: '', description: '', category: 'Food' }); // Reset form if not editing
    }
  }, [currentExpense]);

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value, // Update form state when input changes
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentExpense) {
      onUpdateExpense(currentExpense._id, expense); // Call update function when editing
    } else {
      onAddExpense(expense); // Call add function when creating a new expense
    }
    setExpense({ amount: '', description: '', category: 'Food' }); // Reset the form after submit
  };

  return (
    <div className="Formcontainer">
      <h2>{currentExpense ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={expense.amount}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={expense.description}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
          required
        >
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Others">Others</option>
        </select>
        <button type="submit">
          {currentExpense ? 'Update' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
