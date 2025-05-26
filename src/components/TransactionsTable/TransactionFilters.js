import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveFilter } from "../../../redux/userSlice";

const TransactionFilters = () => {
  // Get the currently active filter from the Redux store
  const { activeFilter } = useSelector((store) => store.user);

  // Get the dispatch function to trigger Redux actions
  const dispatch = useDispatch();

  // Handler to update filter state on pill click
  const handleFilterClick = (event) => {
    // Prevent updating if the container itself is clicked
    if (event.target.id !== "filter") {
      dispatch(updateActiveFilter(event.target.id));
    }
  };

  // Helper function to return conditional className based on active state
  const getPillClass = (filterName) =>
    `single-pill ${activeFilter === filterName ? "single-pill-active" : ""}`;

  // Render the set of filter pills
  return (
    <div className="transaction-filter">
      {/* Filter heading */}
      <h3>Filters: </h3>

      {/* Filter pills container */}
      <div className="filter-pills" id="filter" onClick={handleFilterClick}>
        {/* All filter pill */}
        <div id="all" className={getPillClass("all")}>All</div>

        {/* Food category filter pill */}
        <div id="food" className={getPillClass("food")}>Food</div>

        {/* Travel category filter pill */}
        <div id="travel" className={getPillClass("travel")}>Travel</div>

        {/* Entertainment category filter pill */}
        <div id="entertainment" className={getPillClass("entertainment")}>Entertainment</div>

        {/* Others category filter pill */}
        <div id="others" className={getPillClass("others")}>Others</div>
      </div>
    </div>
  );
};

export default TransactionFilters;
