import React from "react";
import TransactionDetailsTable from "./TransactionsDetailsTable/TransactionsDetailsTable";
import TransactionFilters from "./TransactionFilters";
import styles from "./TransactionsTable.module.css"; 

// TransactionTable component renders filters and detailed transaction data table
const TransactionTable = () => {
  return (
    <div className={styles.transactions}>
      {/* Renders transaction filters to allow users to filter transactions by criteria */}
      <TransactionFilters />

      {/* Horizontal rule for visual separation */}
      <hr />

      {/* Renders the detailed table displaying transactions */}
      <TransactionDetailsTable />
    </div>
  );
};

export default TransactionTable;
