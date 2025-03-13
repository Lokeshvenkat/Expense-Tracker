import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBudget } from '../redux/userSlice';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState(0);
  const [food, setFood] = useState(0);
  const [travel, setTravel] = useState(0);
  const [entertainment, setEntertainment] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const others = budget - (food + travel + entertainment);
    if (others < 0) {
      alert('Total Categorical budget should not exceed monthly budget.');
      return;
    }
    dispatch(setBudget({ name, budget, food, travel, entertainment, others }));
    navigate('/tracker');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to the Expense Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
        <input
          id="budget"
          type="number"
          placeholder="Monthly Budget"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          required
          className={styles.input}
        />
        <input
          id="food"
          type="number"
          placeholder="Food Budget"
          value={food}
          onChange={(e) => setFood(Number(e.target.value))}
          required
          className={styles.input}
        />
        <input
          id="travel"
          type="number"
          placeholder="Travel Budget"
          value={travel}
          onChange={(e) => setTravel(Number(e.target.value))}
          required
          className={styles.input}
        />
        <input
          id="entertainment"
          type="number"
          placeholder="Entertainment Budget"
          value={entertainment}
          onChange={(e) => setEntertainment(Number(e.target.value))}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default LandingPage;
