import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Info from "./components/info";
import { Index } from "./components/ui";
import Menu from "./components/menu";

function AppRouter() {
  return (
    <Router>
      <Route path="/" component={Index} />
      <Route exact path="/info/" component={Info} />
    </Router>
  );
}

function startApp() {
  ReactDOM.render(<AppRouter />, document.getElementById("ui"));
}
export { startApp };
