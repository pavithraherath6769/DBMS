import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Spinner from "../shared/Spinner";
const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const TranscoderFail = lazy(() => import("../transcoder/TranscoderFail"));

class ProtectedRoutes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/console/dashboard" component={Dashboard} />
          <Route exact path="/console/transcoder/fail" component={TranscoderFail} />
          <Redirect to="/console/dashboard" />
        </Switch>
      </Suspense>
    );
  }
}

export default ProtectedRoutes;
