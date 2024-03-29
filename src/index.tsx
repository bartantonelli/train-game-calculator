import React from "react";
import ReactDOM from "react-dom/client";
import App, { BASE_ROUTE } from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import posthog from "posthog-js";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

posthog.init("phc_uz6lMrMkrkZxE3XNSNYtljthqXm40sT3FTpmrlW0AN7", {
  api_host: "https://an.bartantonelli.com",
});
root.render(
  // <React.StrictMode>
  <BrowserRouter basename={BASE_ROUTE}>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
