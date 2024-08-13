import React, { useState, useEffect } from 'react';
import ExpenseForm from '../ExpenseForm';
import ExpenseList from '../ExpenseList';
import ExpenseGraph from '../ExpenseGraph';
import ExpenseCircleWarning from '../ExpenseCircleWarning';
import CategoryBarGraph from '../CategoryBarGraph';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../../services/expenseService';
import './Home.css'; // Add CSS file for styling

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
    <div className="main-container">
      <h2>Expense Tracker</h2>
      <div className="home-container">
        <div className="left">
          <ExpenseForm 
            currentExpense={currentExpense} 
            onAddExpense={handleAddExpense} 
            onUpdateExpense={handleUpdateExpense} 
          />
          <ExpenseList 
            expenses={expenses} 
            onDeleteExpense={handleDeleteExpense} 
            onEditClick={handleEditClick} 
          />
        </div>
        <div className="right">
          <ExpenseGraph data={expenses} />
          <ExpenseCircleWarning data={expenses} />
          <CategoryBarGraph data={expenses} />
        </div>
      </div>
    </div>
  );
};

export default Home;
