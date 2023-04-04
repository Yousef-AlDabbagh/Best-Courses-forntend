import React from "react";
import ReactDOM from "react-dom/client";
import ContextProviders from "./context";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <ContextProviders>
      <App />
    </ContextProviders>
  </BrowserRouter>
);
