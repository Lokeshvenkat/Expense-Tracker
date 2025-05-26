import { configureStore } from "@reduxjs/toolkit";

// Importing reducers from individual feature slices
import expenseSlice from "./expenseSlice";
import transactionSlice from "./transactionSlice";
import userSlice from "./userSlice";

/**
 * Configures the Redux store with the application's slices.
 * Each slice manages a specific portion of the global state.
 */
const store = configureStore({
  reducer: {
    user: userSlice,           // Handles user authentication or profile state
    expense: expenseSlice,     // Manages expense-related data
    transactions: transactionSlice, // Tracks transaction history
  },
});

export default store;
