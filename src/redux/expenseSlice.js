import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    totalExpense: 0,
    categoricalExpense: {
      food: 0,
      travel: 0,
      entertainment: 0,
      others: 0,
    },
  },
  reducers: {
    updateTotalExpense: (state, action) => {
      const { amount, operation } = action.payload;
      if (operation === 'add') {
        state.totalExpense += amount;
      } else if (operation === 'subtract') {
        state.totalExpense -= amount;
      }
    },
    updateCategoricalExpense: (state, action) => {
      const { amount, category, operation } = action.payload;
      if (operation === 'add') {
        state.categoricalExpense[category] += amount;
      } else if (operation === 'subtract') {
        state.categoricalExpense[category] -= amount;
      }
    },
    resetAllExpense: (state) => {
      state.totalExpense = 0;
      state.categoricalExpense = {
        food: 0,
        travel: 0,
        entertainment: 0,
        others: 0,
      };
    },
  },
});

export const {
  updateTotalExpense,
  updateCategoricalExpense,
  resetAllExpense,
} = expenseSlice.actions;

export default expenseSlice.reducer;
