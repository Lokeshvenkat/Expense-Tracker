import React from "react";

// BudgetTable component allows updating categorical budgets via controlled inputs
const BudgetTable = ({ categoricalBudget, setCategoricalBudget }) => {
  // Update categorical budget state for a given category based on input value
  function updateCategoricalBudget(text, categoryName) {
    // Set category value to empty string if input is cleared
    if (text === "") {
      setCategoricalBudget((prev) => ({
        ...prev,
        [categoryName]: "",
      }));
    } else {
      // Otherwise parse the input value as an integer and update category
      setCategoricalBudget((prev) => ({
        ...prev,
        [categoryName]: parseInt(text),
      }));
    }
  }

  // Render a table with numeric inputs for Food, Travel, and Entertainment budgets
  return (
    <table id="budgetTable">
      <thead>
        <tr>
          <th>Food</th>
          <th>Travel</th>
          <th>Entertainment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input
              id="food"
              type="number"
              value={categoricalBudget.food}
              onChange={(e) => updateCategoricalBudget(e.target.value, "food")}
            />
          </td>
          <td>
            <input
              id="travel"
              type="number"
              value={categoricalBudget.travel}
              onChange={(e) => updateCategoricalBudget(e.target.value, "travel")}
            />
          </td>
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
