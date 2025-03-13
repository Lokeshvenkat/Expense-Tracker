import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../redux/transactionSlice';
import styles from './ExpenseForm.module.css';

const ExpenseForm = () => {
  const [expenseName, setExpenseName] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('food');
  const [expenseAmount, setExpenseAmount] = useState(0);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpense({ id: Date.now(), name: expenseName, category: expenseCategory, amount: expenseAmount }));
    // Reset form fields
    setExpenseName('');
    setExpenseCategory('food');
    setExpenseAmount(0);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.form-group}>
          <input
            id="expense-name"
            type="text"
            placeholder="Expense Name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.form-group}>
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
        </div>
        <div className={styles.form-group}>
          <input
            id="expense-amount"
            type="number"
            placeholder="Expense Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(Number(e.target.value))}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
