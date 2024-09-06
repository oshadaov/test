import axios from 'axios';

export const getExpenses = async (userId) => axios.get('/api/expenses');
export const addExpense = async (expense) => axios.post('/api/expenses', expense);
export const updateExpense = async (id, updatedExpense) => axios.put(`/api/expenses/${id}`, updatedExpense);
export const deleteExpense = async (id) => axios.delete(`/api/expenses/${id}`);
