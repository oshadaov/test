import { GET_EXPENSES, ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from '../types';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../../api/expenseApi';

export const loadExpenses = () => async (dispatch) => {
  try {
    const response = await getExpenses();
    dispatch({ type: GET_EXPENSES, payload: response.data });
  } catch (error) {
    console.error('Failed to load expenses:', error);
  }
};

export const createExpense = (expense) => async (dispatch) => {
  try {
    const response = await addExpense(expense);
    dispatch({ type: ADD_EXPENSE, payload: response.data });
  } catch (error) {
    console.error('Failed to add expense:', error);
  }
};

export const editExpense = (id, updatedExpense) => async (dispatch) => {
  try {
    const response = await updateExpense(id, updatedExpense);
    dispatch({ type: UPDATE_EXPENSE, payload: response.data });
  } catch (error) {
    console.error('Failed to update expense:', error);
  }
};

export const removeExpense = (id) => async (dispatch) => {
  try {
    await deleteExpense(id);
    dispatch({ type: DELETE_EXPENSE, payload: id });
  } catch (error) {
    console.error('Failed to delete expense:', error);
  }
};
