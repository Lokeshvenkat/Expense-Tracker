import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetAllExpense } from "../../redux/expenseSlice";
import { removeAllTransactions } from "../../redux/transactionSlice";
import {
  resetAllBudget,
  updateCategoricalBudget,
  updateMonthlyBudget,
  updateUserName,
} from "../../redux/userSlice";
import validateLandingPageForm from "../../utilityFunctions/LandingPageFormMethods";
import BudgetTable from "./BudgetTable";
import "./LandingPageForm.module.css";

const LandingPageForm = () => {
  // Access the user slice of the Redux store to initialize form values
  // This ensures form inputs are pre-filled if user data is already saved
  const user = useSelector((store) => store.user);

  // Hook to dispatch Redux actions to update global state
  const dispatch = useDispatch();

  // React Router hook for navigation between pages programmatically
  const navigate = useNavigate();

  // Local component state to control form inputs:
  // - userName: stores the name of the user
  // - monthlyBudget: stores total budget for the month
  // - categoricalBudget: stores budgets split by category (food, travel, entertainment)
  // Initial values are pulled from the Redux user state for consistency
  const [userName, setUserName] = useState(user.userName);
  const [monthlyBudget, setMonthlyBudget] = useState(user.monthlyBudget);
  const [categoricalBudget, setCategoricalBudget] = useState({
    food: user.categoricalBudget.food,
    travel: user.categoricalBudget.travel,
    entertainment: user.categoricalBudget.entertainment,
  });

  // Event handler triggered on form submission
  // Handles validation, state updates, and navigation
  const formSubmitHandler = (event) => {
    event.preventDefault(); // Prevent page reload on form submit

    // Use external validation function to check form input correctness
    if (validateLandingPageForm(userName, monthlyBudget, categoricalBudget)) {
      // Calculate remaining budget after summing categorical budgets as "others"
      // This ensures the monthly budget is fully allocated across categories
      const othersBudget =
        monthlyBudget -
        (categoricalBudget.food +
          categoricalBudget.travel +
          categoricalBudget.entertainment);

      // Prepare the new categorical budget object including the 'others' category
      const newCategoricalBudget = {
        ...categoricalBudget,
        others: othersBudget,
      };

      // Dispatch Redux actions to update the global user state with form data
      dispatch(updateUserName(userName));
      dispatch(updateMonthlyBudget(monthlyBudget));
      dispatch(updateCategoricalBudget(newCategoricalBudget));

      // Show a success toast notification indicating submission or update
      let message = user.userName ? "Updated " : "Submitted ";
      message += "your budget details";
      toast.success(message);

      // Programmatically navigate the user to the tracker page after submission
      navigate("/tracker");
    }
  };

  // Function to clear all user data, transactions, and expenses with confirmation prompt
  // Resets both Redux store and local component state
  const resetTransactions = () => {
    // Display native confirmation dialog to prevent accidental data loss
    const confirmDelete = window.confirm(
      "This will delete all previous transactions"
    );

    if (confirmDelete === true) {
      // Reset user budget and name state in Redux
      dispatch(resetAllBudget());

      // Clear all stored transactions and expenses from Redux state
      dispatch(removeAllTransactions());
      dispatch(resetAllExpense());

      // Reset the local form fields to empty values to reflect cleared state
      setUserName("");
      setMonthlyBudget("");
      setCategoricalBudget({
        food: "",
        travel: "",
        entertainment: "",
      });

      // Show success notification to confirm data clearance
      toast.success("Deleted all previous transactions");
    }
  };

  // JSX rendering logic for the landing page form UI
  // Form contains:
  // - Text input for user name
  // - Number input for monthly budget with controlled state
  // - BudgetTable child component to input categorical budgets
  // - Conditional buttons for submitting form, clearing data, and navigation
  return (
    <div className="landing-page">
      <div className="landing-page-form">
        {/* Page header and instructions */}
        <div className="heading1">Welcome to your own Expense Tracker</div>
        <div className="heading2">
          Please fill in the below form to start tracking
        </div>

        {/* Main form element with onSubmit handler */}
        <form
          name="landing-page-form"
          className="form-container"
          onSubmit={formSubmitHandler}
        >
          {/* User name input field */}
          <div>
            <label htmlFor="name">Enter your name: </label>
            <input
              id="name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          {/* Monthly budget input field */}
          <div>
            <label htmlFor="budget">Enter your monthly budget: </label>
            <input
              id="budget"
              type="number"
              value={monthlyBudget}
              onChange={(e) =>
                e.target.value === ""
                  ? setMonthlyBudget("") // Allow clearing the input
                  : setMonthlyBudget(parseInt(e.target.value)) // Parse input to number
              }
            />
          </div>

          {/* BudgetTable component handles categorical budget inputs */}
          <div>
            <div>Fill your monthly categorical budget: </div>
            <BudgetTable
              categoricalBudget={categoricalBudget}
              setCategoricalBudget={setCategoricalBudget}
            />
          </div>

          {/* Form buttons container */}
          <div className="form-btn">
            {/* Submit button text changes based on whether user data exists */}
            <button type="submit" className="submit-btn">
              {user.userName ? "Update budget" : "Submit"}
            </button>

            {/* Conditionally render extra buttons only if user data exists */}
            {user.userName && (
              <>
                {/* Button to clear all data and start fresh */}
                <button
                  type="button"
                  id="clear"
                  className="clear-btn"
                  onClick={resetTransactions}
                >
                  Start new tracker
                </button>

                {/* Navigation button to return to tracker page without submitting */}
                <Link to={"/tracker"}>
                  <button className="navigate-tracker-btn">Go Back →</button>
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPageForm;
