import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AllBudgetInsights from "./AllBudgetInsights";
import ExpenseForm from "./ExpenseForm";
import "./TrackerPage.css";
import TransactionTable from "./TransactionTable/TransactionTable";

// TrackerPage component displays user's monthly expenditure tracker UI
const TrackerPage = () => {
  // Extract userName from Redux store's user slice
  const { userName } = useSelector((store) => store.user);

  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Effect to navigate user to home page on page reload/refresh to prevent errors if data missing
  React.useEffect(() => {
    // Navigate to home page if userName is empty or undefined
    if (!userName) {
      navigate("/");
    }
  }, [userName, navigate]);

  // Render the main tracker page layout
  return (
    <div className="tracker-page">
      {/* Title section showing the user's name and monthly expenditure heading */}
      <div className="tracker-page-title">
        {/* Capitalize userName and show title */}
        <h2 className="text-capatilize">{userName}'s monthly expenditure</h2>
        {/* Button linking back to Landing Page to create or update budget tracker */}
        <Link to={"/"}>
          <button id="new-update">New/Update tracker</button>
        </Link>
      </div>
      <hr />

      {/* Component showing all budget insights including charts or summaries */}
      <AllBudgetInsights />
      <hr />

      {/* Form component to add new expenses */}
      <ExpenseForm />
      <hr />

      {/* Table component to list all transactions */}
      <TransactionTable />
      <hr />
    </div>
  );
};

export default TrackerPage;
