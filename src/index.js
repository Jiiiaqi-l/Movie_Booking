import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
const info = [
  { name: "Sonic The Hedge", price: 10.5 },
  { name: "Fantasy Island", price: 9 },
  { name: "Onward", price: 11 },
  { name: "The Half of It", price: 9.5 }
];
ReactDOM.render(
  <React.StrictMode>
    <App info={info} />
  </React.StrictMode>,
  rootElement
);
