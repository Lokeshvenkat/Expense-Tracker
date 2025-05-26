import React from "react";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import styles from "./App.css";

/**
 * App component serves as the root layout.
 * It contains the main title, router outlet, and the global Toaster configuration.
 */
function App() {
  return (
    <div className={styles.app}>
      {/* Application title */}
      <h1 className={styles.appTitle}>xTracker</h1>

      {/* React Router outlet for nested routes */}
      <Outlet />

      {/* Global toast notifications */}
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: "#FFF",
            color: "#000",
            fontWeight: "600",
          },
        }}
      />
    </div>
  );
}

export default App;
