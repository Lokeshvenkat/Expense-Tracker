import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AllBudgetInsights from "../AllBudgetInsights/AllBudgetInsights";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import TransactionTable from "../TransactionsTable/TransacationsTable";
import styles from "./TrackerPage.module.css"; 

// TrackerPage component displays user's monthly expenditure tracker UI
const TrackerPage = () => {
  // Extract userName from Redux store's user slice
  const { userName } = useSelector((store) => store.user);

  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Effect to navigate user to home page on page reload/refresh to prevent errors if data missing
  React.useEffect(() => {
    if (!userName) {
      navigate("/");
    }
  }, [userName, navigate]);

  // Render the main tracker page layout
  return (
    <div className={styles["tracker-page"]}>
      {/* Title section showing the user's name and monthly expenditure heading */}
      <div className={styles["tracker-page-title"]}>
        <h2 className="text-capatilize">{userName}'s monthly expenditure</h2>
        <Link to={"/"}>
          <button id="new-update">New/Update tracker</button>
        </Link>
      </div>
      <hr />
      <AllBudgetInsights />
      <hr />
      <ExpenseForm />
      <hr />
      <TransactionTable />
      <hr />
    </div>
  );
};

export default TrackerPage;
