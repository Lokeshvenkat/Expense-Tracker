import React from "react";

// BudgetTable component renders a table with input fields for each budget category.
// Props:
// - categoricalBudget: an object holding the current budget values for each category.
// - setCategoricalBudget: a state setter function to update the categoricalBudget state.
const BudgetTable = ({ categoricalBudget, setCategoricalBudget }) => {
  /**
   * Updates the categorical budget for a specific category based on user input.
   * @param {string} text - The input value entered by the user (string).
   * @param {string} categoryName - The budget category to update (e.g., "food").
   */
  function updateCategoricalBudget(text, categoryName) {
    // If input is empty, reset the category value to an empty string
    if (text === "") {
      setCategoricalBudget((prev) => ({
        ...prev,
        [categoryName]: "",
      }));
    } else {
      // Parse the input text to an integer and update the category value
      setCategoricalBudget((prev) => ({
        ...prev,
        [categoryName]: parseInt(text),
      }));
    }
  }

  // Render the budget table with input fields for each category
  return (
    <table id="budgetTable">
      <thead>
        <tr>
          {/* Table headers for budget categories */}
          <th>Food</th>
          <th>Travel</th>
          <th>Entertainment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {/* Input for Food budget category */}
          <td>
            <input
              id="food"
              type="number"
              value={categoricalBudget.food}
              onChange={(e) => updateCategoricalBudget(e.target.value, "food")}
              // Input is controlled by categoricalBudget.food state
            />
          </td>

          {/* Input for Travel budget category */}
          <td>
            <input
              id="travel"
              type="number"
              value={categoricalBudget.travel}
              onChange={(e) => updateCategoricalBudget(e.target.value, "travel")}
            />
          </td>

          {/* Input for Entertainment budget category */}
          <td>
            <input
              id="entertainment"
              type="number"
              value={categoricalBudget.entertainment}
              onChange={(e) =>
                updateCategoricalBudget(e.target.value, "entertainment")
              }
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BudgetTable;
