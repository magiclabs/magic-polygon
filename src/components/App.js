import React from "react";
import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";

// Views
import Login from "./Login";
import Callback from "./Callback";
import Home from "./Home";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/callback" exact component={Callback} />
          <Route path="*" exact component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

