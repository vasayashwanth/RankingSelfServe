import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import VerticalTabs from "./VerticalTabs";
import Theme from "./Theme";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <nav className="navbar navbar-dark bg-primary">
      <a href="/">Reauthorize</a>
      <a
        href="#"
        onClick={() => {
          Theme();
          return false;
        }}
      >
        Theme
      </a>
    </nav>
    <VerticalTabs />
  </React.StrictMode>,
  rootElement
);
