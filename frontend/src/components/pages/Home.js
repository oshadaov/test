// src/components/pages/Home.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/config';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, query, where, doc } from 'firebase/firestore';
import ExpenseForm from '../ExpenseForm';
import ExpenseList from '../ExpenseList';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        loadExpenses(user.uid); // Load user's expenses once they are authenticated
      } else {
        setUser(null);
        setExpenses([]); // Reset expenses on logout
      }
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const loadExpenses = async (userId) => {
    const expensesQuery = query(collection(db, 'expenses'), where('userId', '==', userId));
    const querySnapshot = await getDocs(expensesQuery);
    const expensesList = querySnapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }));
    setExpenses(expensesList);
  };

  const handleAddExpense = async (expense) => {
    await addDoc(collection(db, 'expenses'), { ...expense, userId: user.uid });
    loadExpenses(user.uid); // Reload the expenses after adding a new one
  };

  const handleUpdateExpense = async (id, updatedExpense) => {
    const expenseDoc = doc(db, 'expenses', id);
    await updateDoc(expenseDoc, updatedExpense);
    loadExpenses(user.uid); // Reload the expenses after updating
    setCurrentExpense(null); // Clear the form
  };

  const handleDeleteExpense = async (id) => {
    const expenseDoc = doc(db, 'expenses', id);
    await deleteDoc(expenseDoc);
    loadExpenses(user.uid); // Reload the expenses after deleting
  };

  const handleEditClick = (expense) => {
    setCurrentExpense(expense); // Set the expense for editing
  };

  return (
    <div>
      <h2>Welcome {user?.email}</h2>
      <div className="left">
        <ExpenseForm
          currentExpense={currentExpense}
          onAddExpense={handleAddExpense}
          onUpdateExpense={handleUpdateExpense}
        />
      </div>
      <div className="right">
        <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} onEditClick={handleEditClick} />
      </div>
    </div>
  );
};

export default Home;
