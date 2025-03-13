import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import transactionReducer from './transactionSlice';

const rootReducer = {
  user: userReducer,
  transaction: transactionReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
