import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import VerticalTabs from "./VerticalTabs";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <nav className="navbar navbar-dark bg-primary">
      <a href="/">Navbar</a>
    </nav>
    <VerticalTabs />
  </React.StrictMode>,
  rootElement
);
