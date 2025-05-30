import React from "react";
import { Link } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles["error-page"]}>
      <h1>Oops!! you are in the wrong page</h1>
      <Link to={"/"}>
        <button>Home Page</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
