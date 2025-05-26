import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCategoricalExpense,
  updateTotalExpense,
} from "../../../redux/expenseSlice";
import { removeTransactionEntry } from "../../../redux/transactionSlice";
import "./TransactionDetailsTable.css";
import { SUBTRACT } from "../../../utilityFunctions/constants";

const TransactionDetailsTable = () => {
  // Fetch the full list of transactions from the Redux store
  const { transactionList } = useSelector((store) => store.transactions);

  // Fetch the currently active filter (e.g., 'food', 'travel', etc.)
  const { activeFilter } = useSelector((store) => store.user);

  // Local state to maintain the filtered list based on the active filter
  const [filteredList, setFilteredList] = useState(transactionList);

  // Redux dispatch function for dispatching actions
  const dispatch = useDispatch();

  // useEffect to update the filtered list whenever the active filter or transaction list changes
  useEffect(() => {
    if (activeFilter === "all") {
      // If "all" is selected, show all transactions
      setFilteredList(transactionList);
    } else {
      // Otherwise, filter transactions by selected category
      setFilteredList(
        transactionList.filter((list) => list.category === activeFilter)
      );
    }
  }, [transactionList, activeFilter]);

  // Function to handle deletion of a transaction entry
  const deleteTransactionEntry = (event, name, amount, category) => {
    // Ask the user for confirmation before deleting
    const confirmDeleteEntry = window.confirm(
      "Are you sure you want to delete the entry?"
    );

    if (confirmDeleteEntry) {
      // Dispatch action to remove transaction from the transaction list in Redux
      dispatch(removeTransactionEntry(event.target.id));

      // Update the total expense in Redux by subtracting the transaction amount
      dispatch(updateTotalExpense({ amount: amount, operation: SUBTRACT }));

      // Update the specific categorical expense by subtracting the transaction amount
      dispatch(
        updateCategoricalExpense({
          amount: amount,
          category: category,
          operation: SUBTRACT,
        })
      );

      // Show a success toast message to confirm deletion
      toast.success(`Deleted ${name} expense successfully`);
    }
  };

  // Render the transaction details in a table format
  return (
    <div className="transaction-details-table">
      <table className="transaction-page-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Transaction</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Check if there are any filtered transactions to display */}
          {filteredList.length ? (
            filteredList.map(({ id, name, amount, category }, index) => (
              <tr key={id}>
                <td>{index + 1}.</td>
                {/* Capitalize the transaction name */}
                <td className="text-capatilize">{name}</td>
                {/* Capitalize the category name */}
                <td className="text-capatilize">{category}</td>
                {/* Display the amount with currency symbol */}
                <td>Rs {amount}</td>
                {/* Delete button with handler */}
                <td>
                  <button
                    id={id}
                    onClick={(event) =>
                      deleteTransactionEntry(event, name, amount, category)
                    }
                    className="transaction-delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            // Fallback row when there are no transactions to display
            <tr>
              <td colSpan="5">No Transactions Available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetailsTable;
