const ExpenseForm = () => {
  // State variables to manage controlled form inputs
  // expenseName stores the name/description of the expense
  const [expenseName, setExpenseName] = useState("");
  // expenseAmount stores the numeric amount for the expense
  const [expenseAmount, setExpenseAmount] = useState("");
  // expenseCategory stores the selected category from dropdown
  const [expenseCategory, setExpenseCategory] = useState("");

  // Access budget-related data from Redux user slice
  // monthlyBudget is the total monthly budget
  // categoricalBudget stores budgets for categories like food, travel, etc.
  const { monthlyBudget, categoricalBudget } = useSelector(
    (store) => store.user
  );

  // Access expense-related data from Redux expense slice
  // totalExpense is the total amount of all expenses so far
  // categoricalExpense stores expenses summed per category
  const { totalExpense, categoricalExpense } = useSelector(
    (store) => store.expense
  );

  // Redux dispatch function to send actions to store
  const dispatch = useDispatch();

  // Handler function for form submission event
  const newExpenseFormSubmitHandler = (event) => {
    // Prevent default browser page reload on form submit
    event.preventDefault();

    // Validate the form fields using external utility function
    if (validateExpenseForm(expenseName, expenseAmount, expenseCategory)) {
      // Calculate remaining budget after adding this expense for monthly budget
      const monthlyBudgetBalance =
        monthlyBudget - (totalExpense + expenseAmount);

      // Calculate remaining budget after adding this expense for selected category
      const categoricalBudgetBalance =
        categoricalBudget[expenseCategory] -
        (categoricalExpense[expenseCategory] + expenseAmount);

      // Generate alert message and toaster flags based on budget balances
      const { alertMessage, toasterErrorFlag, toasterMessage } =
        generateExpenseFormAlertMessage(
          monthlyBudgetBalance,
          categoricalBudgetBalance,
          expenseCategory
        );

      // Ask user for confirmation using a window confirm popup with alertMessage
      const confirmNewExpense = window.confirm(alertMessage);

      if (confirmNewExpense) {
        // Dispatch Redux actions to update total expenses with addition operation
        dispatch(
          updateTotalExpense({ amount: expenseAmount, operation: ADD })
        );

        // Dispatch Redux action to update categorical expenses with addition operation
        dispatch(
          updateCategoricalExpense({
            amount: expenseAmount,
            category: expenseCategory,
            operation: ADD,
          })
        );

        // Dispatch Redux action to add a new transaction entry with unique ID
        dispatch(
          addTransactionEntry({
            id: generateUniqueID(),
            name: expenseName,
            amount: expenseAmount,
            category: expenseCategory,
          })
        );

        // Reset all form inputs to empty after successful submission
        setExpenseName("");
        setExpenseAmount("");
        setExpenseCategory("");

        // Show toast notification for success or error based on toasterErrorFlag
        if (toasterErrorFlag) {
          toast.error(toasterMessage);
        } else {
          toast.success(toasterMessage);
        }
      }
    }
  };

  // Render the expense form UI with controlled inputs and submit button
  return (
    <div className="expense-form">
      <div className="title">New Expense Form </div>
      <form className="expense-form1" onSubmit={newExpenseFormSubmitHandler}>
        <div className="expense-form-input">
          {/* Input for expense name */}
          <div>
            <label htmlFor="expense-name">Expense Name: </label>
            <input
              type="text"
              id="expense-name"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
            />
          </div>

          {/* Dropdown select for expense category */}
          <div>
            <label htmlFor="category-select">Select category: </label>
            <select
              id="category-select"
              value={expenseCategory}
              onChange={(e) => setExpenseCategory(e.target.value)}
            >
              <option value={""}>--select--</option>
              <option value={"food"}>Food</option>
              <option value={"travel"}>Travel</option>
              <option value={"entertainment"}>Entertainment</option>
              <option value={"others"}>Others</option>
            </select>
          </div>
        </div>

        {/* Input for expense amount */}
        <div>
          <label htmlFor="expense-amount">Expense Amount: </label>
          <input
            type="number"
            id="expense-amount"
            value={expenseAmount}
            onChange={(e) =>
              e.target.value === ""
                ? setExpenseAmount("")
                : setExpenseAmount(parseInt(e.target.value))
            }
          />
        </div>

        {/* Submit button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
