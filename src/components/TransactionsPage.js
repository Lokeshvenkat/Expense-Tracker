// src/components/TransactionsPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransactionEntry } from '../redux/transactionSlice'; // Correct import
import styles from './TransactionsPage.module.css';

const TransactionsPage = () => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('food');
  const [expenseAmount, setExpenseAmount] = useState(0);

  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.transactionList);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTransactionEntry({ id: Date.now(), name: expenseName, category: expenseCategory, amount: expenseAmount }));
    // Reset form fields
    setExpenseName('');
    setExpenseCategory('food');
    setExpenseAmount(0);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Your Transactions</h1>
      <div>
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="expense-name"
            type="text"
            placeholder="Expense Name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            required
            className={styles.input}
          />
          <select
            id="expense-category"
            value={expenseCategory}
            onChange={(e) => setExpenseCategory(e.target.value)}
            className={styles.select}
          >
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
            <option value="others">Others</option>
          </select>
          <input
            id="expense-amount"
            type="number"
            placeholder="Expense Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(Number(e.target.value))}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
      <div>
        <h2>Transaction List</h2>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.name} - ${transaction.amount} ({transaction.category})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionsPage;
