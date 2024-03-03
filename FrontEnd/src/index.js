import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import * as serviceWorker from "./serviceWorker";
import "./app/App.scss";

ReactDOM.render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
