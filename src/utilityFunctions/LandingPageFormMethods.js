import toast from "react-hot-toast";

/**
 * Validates the landing page form inputs.
 *
 * @param {string} userName - User's name input.
 * @param {number} monthlyBudget - User's monthly budget input.
 * @param {Object} categoricalBudget - Object containing category budgets.
 * @param {number} categoricalBudget.food - Food category budget.
 * @param {number} categoricalBudget.travel - Travel category budget.
 * @param {number} categoricalBudget.entertainment - Entertainment category budget.
 * @returns {boolean} Returns true if form is valid, otherwise false and shows toast error.
 */
function validateLandingPageForm(userName, monthlyBudget, categoricalBudget) {
  // Check if all fields are filled and non-empty
  if (
    !userName.trim() ||
    monthlyBudget === "" ||
    categoricalBudget.food === "" ||
    categoricalBudget.travel === "" ||
    categoricalBudget.entertainment === ""
  ) {
    toast.error("All Fields are required!");
    return false;
  }

  // Check if budgets are positive numbers (greater than zero)
  if (
    monthlyBudget <= 0 ||
    categoricalBudget.food <= 0 ||
    categoricalBudget.travel <= 0 ||
    categoricalBudget.entertainment <= 0
  ) {
    toast.error("Budget cannot be negative or zero!");
    return false;
  }

  // Calculate total categorical budget
  const totalCategoricalBudget =
    categoricalBudget.food + categoricalBudget.travel + categoricalBudget.entertainment;

  // Validate that total categorical budget does not exceed monthly budget
  if (monthlyBudget < totalCategoricalBudget) {
    toast.error("Total Categorical budget should not exceed monthly budget");
    return false;
  }

  return true;
}

export default validateLandingPageForm;
