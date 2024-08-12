import React, { useState } from 'react';
import Header from './components/Header';
import Balance from './components/Balance';
import IncomeExpenses from './components/IncomeExpenses';
import TransactionList from './components/TransactionList';
import AddTransaction from './components/AddTransaction';
import './style.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);

  const deleteTransaction = id => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const addTransaction = transaction => {
    setTransactions([transaction, ...transactions]);
  };

  const calculateAmounts = () => {
    const amounts = transactions.map(transaction => transaction.amount);
    const income = amounts.filter(item => item > 0).reduce((acc, item) => acc + item, 0);
    const expenses = amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0);
    const balance = income + expenses;
    return { income, expenses: Math.abs(expenses), balance };
  };

  const { income, expenses, balance } = calculateAmounts();

  return (
    <div>
      <Header />
      <div className="container">
        <Balance balance={balance} />
        <IncomeExpenses income={income} expenses={expenses} />
        <TransactionList transactions={transactions} deleteTransaction={deleteTransaction} />
        <AddTransaction addTransaction={addTransaction} />
        
      </div>
    </div>
  );
};

export default App;
