// src/redux/transactionSlice.js
import { createSlice } from '@reduxjs/toolkit';

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactionList: [],
  },
  reducers: {
    addTransactionEntry: (state, action) => {
      state.transactionList.push(action.payload);
    },
    removeTransactionEntry: (state, action) => {
      state.transactionList = state.transactionList.filter(
        (transaction) => transaction.id !== action.payload.id
      );
    },
    removeAllTransactions: (state) => {
      state.transactionList = [];
    },
  },
});

export const {
  addTransactionEntry,
  removeTransactionEntry,
  removeAllTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
