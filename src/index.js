import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import VerticalTabs from "./VerticalTabs";

const rootElement = document.getElementById("root");
function toggle_style() {
  if (document.getElementById("theme").className === "light") {
    document
      .getElementById("theme")
      .setAttribute(
        "integrity",
        "sha384-nNK9n28pDUDDgIiIqZ/MiyO3F4/9vsMtReZK39klb/MtkZI3/LtjSjlmyVPS3KdN"
      );
    document
      .getElementById("theme")
      .setAttribute(
        "href",
        "https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/darkly/bootstrap.min.css"
      );
    document.getElementById("theme").setAttribute("class", "dark");
  } else if (document.getElementById("theme").className === "dark") {
    document
      .getElementById("theme")
      .setAttribute(
        "integrity",
        "sha384-qF/QmIAj5ZaYFAeQcrQ6bfVMAh4zZlrGwTPY7T/M+iTTLJqJBJjwwnsE5Y0mV7QK"
      );
    document
      .getElementById("theme")
      .setAttribute(
        "href",
        "https://stackpath.bootstrapcdn.com/bootswatch/4.5.2/flatly/bootstrap.min.css"
      );
    document.getElementById("theme").setAttribute("class", "light");
  }
}
ReactDOM.render(
  <React.StrictMode>
    <nav className="navbar navbar-dark bg-primary">
      <a href="/">Reauthorize</a>
      <a
        href="#"
        onClick={() => {
          toggle_style();
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
