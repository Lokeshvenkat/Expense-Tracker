import toast from "react-hot-toast";

/**
 * Generates alert and toast messages based on current expense budgets.
 * 
 * @param {number} monthlyBudgetBalance - Remaining monthly budget after the expense.
 * @param {number} categoricalBudgetBalance - Remaining category budget after the expense.
 * @param {string} expenseCategory - The category of the expense (e.g., food, travel).
 * @returns {Object} Contains alertMessage (string), toasterErrorFlag (boolean), and toasterMessage (string).
 */
function generateExpenseFormAlertMessage(
  monthlyBudgetBalance,
  categoricalBudgetBalance,
  expenseCategory
) {
  let alertMessage = "Do you want to add new Expense?";
  let toasterErrorFlag = false;
  let toasterMessage = "Expense added successfully";

  if (monthlyBudgetBalance < 0 && categoricalBudgetBalance < 0) {
    alertMessage = `Hey your Monthly and ${expenseCategory} expense is exceeding your current budget`;
    toasterErrorFlag = true;
    toasterMessage = `Monthly expense and ${expenseCategory} expense exceeded`;
  } else if (categoricalBudgetBalance < 0) {
    alertMessage = `Hey your ${expenseCategory} expense is exceeding your current budget`;
    toasterErrorFlag = true;
    toasterMessage =
      expenseCategory.charAt(0).toUpperCase() + expenseCategory.slice(1) + ` expense exceeded`;
  } else if (monthlyBudgetBalance < 0) {
    alertMessage = `Hey your monthly expense is exceeding your current budget`;
    toasterErrorFlag = true;
    toasterMessage = `Monthly expense exceeded`;
  }

  return { alertMessage, toasterErrorFlag, toasterMessage };
}

/**
 * Validates expense form input values.
 * 
 * @param {string} expenseName - Name of the expense.
 * @param {string | number} expenseAmount - Amount entered for the expense.
 * @param {string} expenseCategory - Category selected for the expense.
 * @returns {boolean} True if valid, otherwise false and shows toast error.
 */
function validateExpenseForm(expenseName, expenseAmount, expenseCategory) {
  if (!expenseName.trim() || expenseAmount === "" || expenseCategory === "") {
    toast.error("All Fields are required!");
    return false;
  }

  if (expenseAmount <= 0) {
    toast.error("Expense cannot be negative or zero");
    return false;
  }

  return true;
}

export { generateExpenseFormAlertMessage, validateExpenseForm };
