import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/Store";
import App from "./App";
import ErrorPage from "./ErrorPage/ErrorPage";
import LandingPageForm from "./components/LandingPage/LandingPageForm";
import TrackerPage from "./components/TrackerPage/TrackerPage";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Expose Redux store for Cypress end-to-end testing
if (window.Cypress) {
  window.store = store;
}

// Create the application router with routes and error handling
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPageForm />,
      },
      {
        path: "/tracker",
        element: <TrackerPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

// Render the app in the root element
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  </React.StrictMode>
);

// Report web vitals if needed
reportWebVitals();
