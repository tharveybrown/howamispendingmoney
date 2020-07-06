import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Expenses from "../components/Expenses";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/expenses" component={Expenses} />
    {/* <Route path="/contacts" component={Contacts} /> */}
  </Switch>
);

export default Routes;
