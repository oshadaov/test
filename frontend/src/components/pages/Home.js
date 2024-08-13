import React, { useState, useEffect } from 'react';
import ExpenseForm from '../ExpenseForm';
import ExpenseList from '../ExpenseList';
import ExpenseGraph from '../ExpenseGraph';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../../services/expenseService';
import './Home.css'; // Optional: Add a CSS file for styling

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const response = await getExpenses();
    setExpenses(response.data);
  };

  const handleAddExpense = async (expense) => {
    await addExpense(expense);
    loadExpenses();
  };

  const handleUpdateExpense = async (id, updatedExpense) => {
    await updateExpense(id, updatedExpense);
    loadExpenses();
    setCurrentExpense(null); // Clear the form after updating
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    loadExpenses();
  };

  const handleEditClick = (expense) => {
    setCurrentExpense(expense);
  };

  return (
    <div className="home-container">
      <h2>Expense Tracker</h2>
      
      <div className='left'>
      <ExpenseForm 
        currentExpense={currentExpense} 
        onAddExpense={handleAddExpense} 
        onUpdateExpense={handleUpdateExpense} 
      />
      
      {/* Expense List */}
      <ExpenseList 
        expenses={expenses} 
        onDeleteExpense={handleDeleteExpense} 
        onEditClick={handleEditClick} 
      />
</div>
      {/* Expense Graph */}
      <ExpenseGraph data={expenses} />
    </div>
  );
};

export default Home;
