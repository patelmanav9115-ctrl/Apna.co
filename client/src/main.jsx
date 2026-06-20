import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HelmetProvider>
      <ErrorBoundary>
        <ScrollToTop />
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </BrowserRouter>
);