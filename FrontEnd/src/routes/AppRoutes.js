import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../app/shared/Spinner";
const App = lazy(() => import("../app/App"));
const Login = lazy(() => import("../app/user-pages/Login"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/console" component={App} />
          <Route exact path="/" component={Login} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
