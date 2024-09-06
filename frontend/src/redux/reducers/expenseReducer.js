import { GET_EXPENSES, ADD_EXPENSE, UPDATE_EXPENSE, DELETE_EXPENSE } from '../types';

const initialState = {
  expenses: [],
  loading: true,
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXPENSES:
      return { ...state, expenses: action.payload, loading: false };

    case ADD_EXPENSE:
      return { ...state, expenses: [action.payload, ...state.expenses], loading: false };

    case UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense._id === action.payload._id ? action.payload : expense
        ),
        loading: false,
      };

    case DELETE_EXPENSE:
      return { ...state, expenses: state.expenses.filter((expense) => expense._id !== action.payload) };

    default:
      return state;
  }
};

export default expenseReducer;
