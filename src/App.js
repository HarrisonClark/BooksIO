import React from "react";
import Search from "./Search";
import Library from "./Library";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/library" component={Library} />
        <Route component={Page404} />
      </Switch>
    </Router>
  );
}

function Page404() {
  return (
    <div>
      <h1>Page Not Found!</h1>
    </div>
  );
}
