import React from "react";
import { useSelector } from "react-redux";
import "./AllBudgetInsights.css";

/**
 * LimitStatusPill Component
 * 
 * Displays a small pill/button indicating whether the budget limit for a category
 * has been exceeded or is still within the allocated budget.
 * 
 * Props:
 *  - balance (number): The remaining balance for a budget category.
 * 
 * Behavior:
 *  - If balance is negative, it indicates the budget is exceeded.
 *  - If balance is zero or positive, the budget is within limits.
 */
const LimitStatusPill = ({ balance }) => {
  // Determine if the limit has been exceeded (negative balance)
  const isLimitExceeded = balance < 0;

  // Set the display text accordingly: "exceed" if over budget, otherwise "within"
  const LimitStatusText = isLimitExceeded ? "exceed" : "within";

  // Render the pill with different styles based on limit status
  return (
    <div className={isLimitExceeded ? "limit-exceed-btn" : "limit-within-btn"}>
      {LimitStatusText}
    </div>
  );
};

/**
 * AllBudgetInsights Component
 * 
 * Displays a summary table of the user's budget insights, including each category's
 * budget, expense, remaining balance, and whether the limit is exceeded.
 * 
 * Data Sources:
 *  - monthlyBudget, categoricalBudget: from user slice in Redux store
 *  - totalExpense, categoricalExpense: from expense slice in Redux store
 * 
 * Calculations:
 *  - totalMonthlyBalance: total budget minus total expense
 *  - categoricalBalance: budget minus expense for each category
 * 
 * Rendering:
 *  - Displays a table with rows for total budget and each category
 *  - Uses LimitStatusPill to show status for each row
 */
const AllBudgetInsights = () => {
  // Extract the user's monthly and categorical budgets from the Redux user slice
  const { monthlyBudget, categoricalBudget } = useSelector((store) => store.user);

  // Extract the total expense and categorical expenses from the Redux expense slice
  const { totalExpense, categoricalExpense } = useSelector((store) => store.expense);

  // Calculate the remaining balance for the total monthly budget
  const totalMonthlyBalance = monthlyBudget - totalExpense;

  // Calculate the remaining balance for each categorical budget
  const categoricalBalance = {
    food: categoricalBudget.food - categoricalExpense.food,
    travel: categoricalBudget.travel - categoricalExpense.travel,
    entertainment: categoricalBudget.entertainment - categoricalExpense.entertainment,
    others: categoricalBudget.others - categoricalExpense.others,
  };

  // Render the budget insights table with budget data and limit status pills
  return (
    <div className="insights">
      <table className="insight-table">
        <thead>
          <tr>
            {/* Table header columns */}
            <th>Category</th>
            <th>Limit Status</th>
            <th>Budget</th>
            <th>Expense</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {/* Render the total summary row */}
          <tr>
            <td>All</td>
            <td>
              {/* Show if total budget is exceeded or within limit */}
              <LimitStatusPill balance={totalMonthlyBalance} />
            </td>
            <td>{monthlyBudget}</td>
            <td>{totalExpense}</td>
            <td>{totalMonthlyBalance}</td>
          </tr>

          {/* Render row for 'Food' category */}
          <tr>
            <td>Food</td>
            <td>
              {/* Show if food budget is exceeded or within limit */}
              <LimitStatusPill balance={categoricalBalance.food} />
            </td>
            <td>{categoricalBudget.food}</td>
            <td>{categoricalExpense.food}</td>
            <td>{categoricalBalance.food}</td>
          </tr>

          {/* Render row for 'Travel' category */}
          <tr>
            <td>Travel</td>
            <td>
              {/* Show if travel budget is exceeded or within limit */}
              <LimitStatusPill balance={categoricalBalance.travel} />
            </td>
            <td>{categoricalBudget.travel}</td>
            <td>{categoricalExpense.travel}</td>
            <td>{categoricalBalance.travel}</td>
          </tr>

          {/* Render row for 'Entertainment' category */}
          <tr>
            <td>Entertainment</td>
            <td>
              {/* Show if entertainment budget is exceeded or within limit */}
              <LimitStatusPill balance={categoricalBalance.entertainment} />
            </td>
            <td>{categoricalBudget.entertainment}</td>
            <td>{categoricalExpense.entertainment}</td>
            <td>{categoricalBalance.entertainment}</td>
          </tr>

          {/* Render row for 'Others' category */}
          <tr>
            <td>Others</td>
            <td>
              {/* Show if others budget is exceeded or within limit */}
              <LimitStatusPill balance={categoricalBalance.others} />
            </td>
            <td>{categoricalBudget.others}</td>
            <td>{categoricalExpense.others}</td>
            <td>{categoricalBalance.others}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AllBudgetInsights;
