import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

if (process.env.NODE_ENV === "development") {
  const SWIZZLE_TIME = false;
  if (SWIZZLE_TIME) {
    const TimeShift = require("timeshift-js");
    ((window || global) as any).Date = TimeShift.Date;
    (window as any).timeshift = TimeShift;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
