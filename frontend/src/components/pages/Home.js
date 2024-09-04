import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/config'; // Ensure you import your Firebase auth
import ExpenseForm from '../ExpenseForm';
import ExpenseList from '../ExpenseList';

import { getExpenses, addExpense, updateExpense, deleteExpense } from '../../services/expenseService';
import './Home.css';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for changes to the user's authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Set the user if logged in
        loadExpenses(user.uid); // Load expenses specific to this user
      } else {
        setUser(null);
        setExpenses([]);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

  const loadExpenses = async (userId) => {
    try {
      const response = await getExpenses(userId);
      setExpenses(response.data);
    } catch (error) {
      console.error('Failed to load expenses:', error);
    }
  };

  const handleAddExpense = async (expense) => {
    try {
      await addExpense({ ...expense, userId: user.uid }); // Add userId to the expense
      loadExpenses(user.uid);
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  const handleUpdateExpense = async (id, updatedExpense) => {
    try {
      await updateExpense(id, { ...updatedExpense, userId: user.uid }); // Include userId
      loadExpenses(user.uid);
      setCurrentExpense(null);
    } catch (error) {
      console.error('Failed to update expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id, user.uid); // Include userId
      loadExpenses(user.uid);
    } catch (error) {
      console.error('Failed to delete expense:', error);
    }
  };

  const handleEditClick = (expense) => {
    setCurrentExpense(expense);
  };

  return (
    <div className="main-container">
      <h2>{user ? `${user.displayName}'s ` : ''}Expense Tracker</h2>
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
        {/* <div className="right">
          <ExpenseGraph data={expenses} totalBudget={4000} />
          <CategoryBarGraph data={expenses} />
        </div> */}
      </div>
    </div>
  );
};

export default Home;
