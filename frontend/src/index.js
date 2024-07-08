import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import './asset/fonts/Radikal/radikal-black.otf'
import './asset/fonts/Radikal/radikal-bold.otf'
import './asset/fonts/Radikal/radikal-light.otf'
import './asset/fonts/Radikal/radikal-medium.otf'
import './asset/fonts/Radikal/radikal-thin.otf'
import './asset/fonts/Radikal/radikal.otf'
import './asset/css/style.css'
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
