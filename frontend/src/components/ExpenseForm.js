import React, { useState, useEffect } from 'react';
import './ExpenseForm.css';

const ExpenseForm = ({ currentExpense, onAddExpense, onUpdateExpense }) => {
  const [expense, setExpense] = useState({ amount: '', description: '', category: 'Food' }); 

  useEffect(() => {
    if (currentExpense) {
      setExpense(currentExpense);
    } else {
      setExpense({ amount: '', description: '', category: 'Food' }); 
    }
  }, [currentExpense]);

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentExpense) {
      onUpdateExpense(currentExpense._id, expense);
    } else {
      onAddExpense(expense);
    }
    setExpense({ amount: '', description: '', category: 'Food' }); // Reset to default category
  };

  return (
    <div>
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
          <option value="Drugs">Drugs</option>
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
